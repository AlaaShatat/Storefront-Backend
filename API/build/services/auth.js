"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = exports.requireSignin = void 0;
const express_jwt_1 = require("express-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requireSignin = (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET || "secret_alo2a",
    algorithms: ["HS256"],
    requestProperty: "auth"
});
exports.requireSignin = requireSignin;
const isAuth = (req, res, next) => {
    // auth is the user signed in 
    // profile is the requested 
    // so we need to match the signed in with the requested if they are the same 
    const flag = req.auth && Number(req.params.userId) == req.auth.id;
    console.log("requested " + req.params.userId);
    console.log("signed " + req.auth.id);
    if (!flag) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => {
    if (req.auth.isadmin == 0) {
        // it should be auth as auth is the user signed in  
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
    }
    next();
};
exports.isAdmin = isAdmin;
