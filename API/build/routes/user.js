"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userHandler_1 = require("../handlers/userHandler");
const auth_1 = require("../services/auth");
const userRoute = express_1.default.Router();
// handlers
// routes
userRoute.get('/user/:userId', auth_1.requireSignin, auth_1.isAuth, auth_1.isAdmin, userHandler_1.indexAll);
userRoute.get('/user/find/:userId', auth_1.requireSignin, auth_1.isAuth, userHandler_1.showUser);
userRoute.post('/user/signup', userHandler_1.signup);
userRoute.post('/user/signin', userHandler_1.signin);
userRoute.post('/user/signout', userHandler_1.signout);
exports.default = userRoute;
