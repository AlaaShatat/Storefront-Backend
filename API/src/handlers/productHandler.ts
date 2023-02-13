import express from 'express';
import {productStorage } from '../models/product';
import { Product } from '../types/product';

// get all products
const indexAll = async(req: express.Request, res: express.Response): Promise<void> =>{
    try{
        const allProducts = new productStorage();
        const products : Product[] = await allProducts.index();
        await res.status(200).send(products);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't load products"});
    };
};

// get product by id 
const showProduct = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the id from params
    const id: number = req.params.productId? Number(req.params.productId) : -1; 

    try{
        const allProducts = new productStorage();
        const product: Product = await allProducts.show(id);

        await res.status(200).send(product);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't find product"});
    };
}
// create new product
const createProduct = async (req: express.Request, res: express.Response): Promise<void> =>{
    // get the product data from req body
    const pName: string = req.body.pName? req.body.pName: null;
    const price: number = req.body.price?Number(req.body.price): -1 ;
    // check if any is null 
    if (pName == null || price < 0)
    {
        await res.status(400).send({'error': "missing information"});
        return;
    }

    const reqProduct: Product = {
        id: null,
        pname: pName,
        price: price
    };
    try{

        const allProducts = new productStorage();
        const product: Product = await allProducts.create(reqProduct);

        await res.status(200).send(product);
    }
    catch(err){
        await res.status(400).send({'error': "couldn't find Product"});
    };
}


export {indexAll, showProduct, createProduct};