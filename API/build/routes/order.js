"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderHandler_1 = require("../handlers/orderHandler");
const auth_1 = require("../services/auth");
const orderRoute = express_1.default.Router();
// handlers
// routes
orderRoute.get('/order/:userId', auth_1.requireSignin, auth_1.isAuth, auth_1.isAdmin, orderHandler_1.indexAll);
orderRoute.get('/order/find/:orderId', orderHandler_1.showOrder);
orderRoute.get('/order/find/current/:userId', auth_1.requireSignin, auth_1.isAuth, orderHandler_1.showCurrentOrder);
orderRoute.get('/order/find/current/details/:userId', auth_1.requireSignin, auth_1.isAuth, orderHandler_1.showCurrentOrderDetails);
orderRoute.post('/order/create/:userId', auth_1.requireSignin, auth_1.isAuth, orderHandler_1.createOrder);
exports.default = orderRoute;
