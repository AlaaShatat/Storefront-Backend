import express from 'express';
import { indexAll, showUser, signup, signin, signout } from '../handlers/userHandler';
import { requireSignin,isAuth,isAdmin } from '../services/auth';

const userRoute = express.Router();

// handlers

// routes
userRoute.get('/user/:userId',requireSignin,isAuth, isAdmin, indexAll);
userRoute.get('/user/find/:userId', showUser);
userRoute.post('/user/signup', signup);
userRoute.post('/user/signin', signin);
userRoute.post('/user/signout', signout);

export default userRoute;