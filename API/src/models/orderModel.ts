import { Order } from "../types/order";
import client from "../database";

export class orderStorage{
    // show all products
    async index(): Promise<Order[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            
            // release connections
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`Could not get orders. Error: ${err}`)
        };       
    }

    // show order
    async show(id:number): Promise<Order>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get order. Error: ${err}`)
        };       
    }
    // get order open
    async showCurrentOrder(id:number): Promise<Order[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND complete_status=($2)';
            const result = await conn.query(sql, [id, false]);
            
            // release connections
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`Could not get order. Error: ${err}`)
        };       
    }

    // create
    async create(order: Order): Promise<Order>{
        try{
            
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (user_id, product_number, complete_status) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [order.user_id, order.product_number, order.complete_status]);
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not insert the order. Error: ${err}`)
        };       
    }
};