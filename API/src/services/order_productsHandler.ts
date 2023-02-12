import client from "../database";
import { OrderProducts } from "../types/order_products";

export class OrderProductstorage{
    // show all products in all orders
    async index(): Promise<OrderProducts[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM order_products';
            const result = await conn.query(sql);
            
            // release connections
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`Could not get order products. Error: ${err}`)
        };       
    }

    // show products of a given order
    async show(id:number): Promise<OrderProducts[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM order_products WHERE order_id=($1)';
            const result = await conn.query(sql, [id]);
            
            // release connections
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`Could not get order products for this order. Error: ${err}`)
        };       
    }
    // create
    async create(orderproducts: OrderProducts): Promise<OrderProducts>{
        try{
            
            const conn = await client.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [orderproducts.order_id, orderproducts.product_id, orderproducts.quantity]);
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not insert the order product. Error: ${err}`)
        };       
    }
};