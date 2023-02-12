import express from 'express';
import { createOrder, indexAll, showCurrentOrder, showOrder } from '../handlers/orderHandler';
import { requireSignin, isAuth, isAdmin } from '../services/auth';
const orderRoute = express.Router();

// handlers

// routes
orderRoute.get('/order/:userId', requireSignin,isAuth,isAdmin,indexAll);
orderRoute.get('/order/find/:orderId', showOrder);
orderRoute.get('/order/find/current/:userId',requireSignin, isAuth,showCurrentOrder);
orderRoute.post('/order/create/:userId',requireSignin,isAuth, createOrder);

export default orderRoute;