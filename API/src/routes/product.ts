import express from 'express';
import { indexAll, showProduct, createProduct } from '../handlers/productHandler';

const productRoute = express.Router();

// handlers

// routes
productRoute.get('/product/', indexAll);

productRoute.get('/product/find/', showProduct);

productRoute.post('/product/create', createProduct);

export default productRoute;