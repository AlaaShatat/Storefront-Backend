import express from 'express';
import { Order } from '../types/order';
import { orderStorage } from '../models/orderModel';

// get all orders
const indexAll = async(req: express.Request, res: express.Response): Promise<void> =>{
    try{
        const allOrders = new orderStorage();
        const orders : Order[] = await allOrders.index();
        await res.status(200).send(orders);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't load orders"});
    };
};

// get order by id 
const showOrder = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the id from params
    const id: number = req.params.orderId? Number(req.params.orderId) : -1; 

    try{
        const allOrders = new orderStorage();
        const order: Order = await allOrders.show(id);

        await res.status(200).send(order);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't find order"});
    };
}
// get order by id 
const showCurrentOrder = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the id from params
    const id: number = req.params.userId? Number(req.params.userId) : -1; 

    try{
        const allOrders = new orderStorage();
        const order: Order[] = await allOrders.showCurrentOrder(id);

        await res.status(200).send(order);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't find order"});
    };
}

// create new product
const createOrder = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the order data from req body
    const user_id: number = req.params.userId?Number(req.params.userId): -1 ;
    const product_number: number = req.body.product_number? req.body.product_number: -1;
    const complete_status: boolean = req.body.complete_status?Boolean(req.body.complete_status): false ;
    
    // check if any is null 
    if (product_number <=0 || user_id <= 0)
    {
        await res.status(400).send({'error': "missing information"});
    } 
    const reqOrder: Order = {
        id: null,
        user_id: user_id,
        product_number: product_number,
        complete_status: complete_status
    };
    try{

        const allOrders = new orderStorage();
        const order: Order = await allOrders.create(reqOrder);

        await res.status(200).send(order);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't find Product"});
    };
}


export {indexAll, showOrder, createOrder, showCurrentOrder};