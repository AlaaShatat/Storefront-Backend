import client from "../database";

export type User = {
    id: Number,
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
    async show(id: string): Promise<User[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id={$1}';
            const result = await conn.query(sql, [Number(id)]);
            
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get user. Error: ${err}`)
        };       
    }

    // sign up 
    async create(user: User): Promise<User[]>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, hashedPass) VALUES $(1,2,3,4) RETURNING *';
            const result = await conn.query(sql, [user.firstName, user.lastName, user.hashedPass]);
            
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get users. Error: ${err}`)
        };       
    }

    // sign in TBD
};