import client from "../database";

export type Product = {
    id: Number | null,
    pName: string,
    price: number
};
export class productStorage{
    // show all products
    async index(): Promise<Product[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            
            // release connections
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`Could not get products. Error: ${err}`)
        };       
    }

    // show a product
    async show(id:number): Promise<Product>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not get product. Error: ${err}`)
        };       
    }

    // create
    async create(product: Product): Promise<Product>{
        try{
            
            const conn = await client.connect();
            const sql = 'INSERT INTO products (pname, price) VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql, [product.pName, product.price]);
            // release connections
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`Could not insert the product. Error: ${err}`)
        };       
    }
};