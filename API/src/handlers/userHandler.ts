import express from 'express';
import { User, userStorage } from '../models/user';

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
    const id: number = req.query.id? Number(req.query.id) : -1; 

    //try{
        const allUsers = new userStorage();
        const user: User = await allUsers.show(id);

        await res.status(200).send(user);
    //}
    //catch(err){
      //  await res.status(400).send({'error': "couldn't find user"});
    //};
}
// create new user
const signup = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the user data from req body
    const fName: string = req.body.firstName? req.body.firstName: null;
    const lName: string = req.body.lastName?req.body.lastName: null ;
    const pass: string = req.body.hashedPass? req.body.hashedPass: null;
    
    // check if any is null 
    if (fName == null || lName == null || pass == null )
    {
        await res.status(400).send({'error': "missing information"});
    } 
    const reqUser: User = {
        id: null,
        firstName: fName,
        lastName: lName,
        hashedPass: pass
    };
    try{

        const allUsers = new userStorage();
        const user: User = await allUsers.create(reqUser);

        await res.status(200).send(user);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't find user"});
    };
}


export {indexAll, showUser, signup};