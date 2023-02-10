import express from 'express';
import { indexAll, showUser, signup } from '../handlers/userHandler';

const userRoute = express.Router();

// handlers

// routes
userRoute.get('/user/', indexAll);

userRoute.get('/user/find/', showUser);

userRoute.post('/user/signup', signup);

export default userRoute;