import express from 'express';
import { indexAll, showProduct, createProduct } from '../handlers/productHandler';
import { requireSignin, isAuth, isAdmin, putToken } from '../services/auth';
const productRoute = express.Router();

// handlers

// routes
productRoute.get('/product/', indexAll);

productRoute.get('/product/find/:productId', showProduct);

productRoute.post('/product/create/:userId',putToken,requireSignin,isAuth,isAdmin, createProduct);

export default productRoute;