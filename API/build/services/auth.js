"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putToken = exports.isAdmin = exports.isAuth = exports.requireSignin = void 0;
const express_jwt_1 = require("express-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const userStorage_1 = require("../models/userStorage");
dotenv_1.default.config();
const putToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.headers['Authorization'] = 'Bearer ' + req.cookies["token"];
    next();
});
exports.putToken = putToken;
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
    if (!flag) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allusers = new userStorage_1.userStorage();
    const user = yield allusers.show(Number(req.auth.id));
    if (user.isadmin == 0) {
        // it should be auth as auth is the user signed in  
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
    }
    next();
});
exports.isAdmin = isAdmin;
