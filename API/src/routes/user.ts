import express from 'express';
import { indexAll, showUser, signup, signin, signout } from '../handlers/userHandler';

const userRoute = express.Router();

// handlers

// routes
userRoute.get('/user/', indexAll);
userRoute.get('/user/find/', showUser);
userRoute.post('/user/signup', signup);
userRoute.post('/user/signin', signin);
userRoute.post('/user/signout', signout);
export default userRoute;