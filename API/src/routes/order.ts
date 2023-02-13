import express from 'express';
import { createOrder, indexAll, showCurrentOrder, showOrder, showCurrentOrderDetails } from '../handlers/orderHandler';
import { requireSignin, isAuth, isAdmin,putToken } from '../services/auth';
const orderRoute = express.Router();

// handlers

// routes
orderRoute.get('/order/:userId', putToken,requireSignin,isAuth,isAdmin,indexAll);
orderRoute.get('/order/find/:orderId', putToken,requireSignin,isAuth,isAdmin,showOrder);
orderRoute.get('/order/find/current/:userId',putToken,requireSignin, isAuth,showCurrentOrder);
orderRoute.get('/order/find/current/details/:userId',putToken,requireSignin, isAuth,showCurrentOrderDetails);

orderRoute.post('/order/create/:userId',putToken,requireSignin,isAuth, createOrder);

export default orderRoute;