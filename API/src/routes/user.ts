import express from 'express';
import {
  indexAll,
  showUser,
  signup,
  signin,
  signout,
} from '../handlers/userHandler';
import { requireSignin, isAuth, isAdmin, putToken } from '../services/auth';

const userRoute = express.Router();

// handlers

// routes
userRoute.get('/user/:userId', requireSignin, isAuth, isAdmin, indexAll);
userRoute.get('/user/find/:userId', requireSignin, isAuth, showUser);
userRoute.post('/user/signup', signup);
userRoute.post('/user/signin', signin);
userRoute.post('/user/signout', signout);

export default userRoute;
