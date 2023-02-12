import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import client from "../database";
import { User } from '../types/User';

dotenv.config()
// pepper and salt configuration
const pepper: string = process.env.BCRYPT_PASSWORD || "alo2a";
const saltRounds: number = Number(process.env.SALT_ROUNDS) || 10

export class userStorage{
    // show all users
    async index(): Promise<User[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            
            // release connections
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`Could not get users. Error: ${err}`)
        };       
    }

    // show a user
    async show(id:number): Promise<User>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get user. Error: ${err}`)
        };       
    }

    // sign up 
    async create(user: User): Promise<User>{
        try{
            const hash = bcrypt.hashSync(
                user.hashedpass + pepper, 
                saltRounds
              );            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, hashedpass, email, isadmin) VALUES ($1,$2,$3,$4,$5) RETURNING *';
            const result = await conn.query(sql, [user.firstname, user.lastname, hash, user.email, user.isadmin]);
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not insert the user. Error: ${err}`)
        };       
    }

    // show a user
    async findByEmail(email:string): Promise<User>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE email=($1)';
            const result = await conn.query(sql, [email]);
            
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get user. Error: ${err}`)
        };       
    }
    // sign in
    async signinUser(email:string, pass: string): Promise<User|null>{
        try{
            // check if the email exists
            const tempUser: User = await this.findByEmail(email);
            const plain:string = pass+pepper;
            const hashed: string = tempUser.hashedpass;
            const flag:boolean = await bcrypt.compareSync(plain, hashed);
            if (tempUser){
                if (flag) {
                    console.log('password checked');
                    return tempUser;
                  }
            }
            return null;
        }
        catch(err){
            throw new Error(`Could not get user. Error: ${err}`);
        };       
    }
};