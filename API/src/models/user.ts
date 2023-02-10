import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import client from "../database";


dotenv.config()
// pepper and salt configuration
const pepper: string = process.env.BCRYPT_PASSWORD || "alo2a";
const saltRounds: number = Number(process.env.SALT_ROUNDS) || 10


export type User = {
    id: Number | null,
    firstName: string,
    lastName: string,
    hashedPass: string
};

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
                user.hashedPass + pepper, 
                saltRounds
              );            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, hashedpass) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [user.firstName, user.lastName, hash]);
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not insert the user. Error: ${err}`)
        };       
    }

    // sign in
};