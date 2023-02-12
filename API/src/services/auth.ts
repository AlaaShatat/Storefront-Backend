import express from 'express';
import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

import { CustomRequest } from '../extendRequest/customRequest';

dotenv.config()

const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET || "secret_alo2a",
    algorithms: ["HS256"],
    requestProperty: "auth"  
});

const isAuth = (req: express.Request, res: express.Response, next: Function) =>{
    // auth is the user signed in 
    // profile is the requested 
    // so we need to match the signed in with the requested if they are the same 
    const flag: boolean = (req as CustomRequest).auth && Number(req.params.userId) == (req as CustomRequest).auth.id;
    console.log("requested " + req.params.userId);
    console.log("signed " + (req as CustomRequest).auth.id);
    if(!flag){
        return res.status(403).json({
            error: "Access denied"
        });
    }

    next();

};
const isAdmin = (req: express.Request, res: express.Response, next: Function) =>{
    if ((req as CustomRequest).auth.isadmin == 0){
        // it should be auth as auth is the user signed in  
        return res.status(403).json({
            error : "Admin resource! Access denied"
        });
    }
    next ();
};
export {requireSignin, isAuth, isAdmin};