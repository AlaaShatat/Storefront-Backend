import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// folders
import { userStorage } from '../models/userStorage';
import { User } from '../types/User';

dotenv.config()
const secret: string = process.env.JWT_SECRET || "secret_alo2a";

// get all users
const indexAll = async(req: express.Request, res: express.Response): Promise<void> =>{
    try{
        const allUsers = new userStorage();
        const users : User[] = await allUsers.index();
        await res.status(200).send(users);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't load users"});
    };
};

// get user by id 
const showUser = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the id from params
    const id: number = req.params.userId? Number(req.params.userId) : -1; 
    console.log(id);
    try{
        const allUsers = new userStorage();
        const user: User = await allUsers.show(id);

        await res.status(200).send(user);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't find user"});
    };
};
// create new user
const signup = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the user data from req body
    const fName: string = req.body.firstName? req.body.firstName: null;
    const lName: string = req.body.lastName?req.body.lastName: null ;
    const pass: string = req.body.hashedPass? req.body.hashedPass: null;
    const email: string = req.body.email? req.body.email: null
    const isAdmin: number = req.body.isAdmin? Number(req.body.isAdmin): 0
    
    // check if any is null 
    if (fName == null || lName == null || pass == null || email == null)
    {
        await res.status(400).send({'error': "missing information"});
    }
    const allUsers = new userStorage();
    // check if email already exists
    const emailFlag: User = await allUsers.findByEmail(email);
    if (emailFlag){
        await res.status(400).send({"error": "email already exists"});
    }
    else{
        // create instance to be sent
        const reqUser: User = {
            id: null,
            firstname: fName,
            lastname: lName,
            hashedpass: pass,
            email: email,
            isadmin: isAdmin
        };
        try{
            const user: User = await allUsers.create(reqUser);

            await res.status(200).send(user);
        }
        catch(err){
            await res.status(400).send({'error': "wrong information"});
        };
    }
    
};
// signin user
const signin = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the data from body
    const email: string = req.body.email? req.body.email: null
    const pass: string = req.body.pass? req.body.pass: null;
    // check if any is null 
    if (pass == null || email == null)
    {
        await res.status(400).send({'error': "missing information"});
    }
    else{
        // continue
        try{
            const allUsers = new userStorage();
            // check if email doesn't exist
            const returnedUser = await allUsers.findByEmail(email);
            if (! returnedUser){
                await res.status(400).send({"error": "email Doesn't exist"});
            }
            else{
                const user: User|null = await allUsers.signinUser(email, pass);
                if (user){
                    const {id, firstname, lastname, email, isadmin} = user;
                    // genrate token
                    const token = jwt.sign({id:user.id}, secret);
                    // add to in the cookie with expire date
                    await res.status(200).json({token,user: {id, firstname, lastname, email, isadmin} });
                }
            }
        }
        catch(err){
            await res.status(400).send({'error': "wrong password"});
        };
    }
    
};

// signout 
const signout = async(req:express.Request, res:express.Response): Promise<void>=>{
    res.clearCookie("token");
    await res.status(200).send("signout");
}

export {indexAll, showUser, signup, signin, signout};