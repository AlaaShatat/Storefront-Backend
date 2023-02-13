"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productHandler_1 = require("../handlers/productHandler");
const auth_1 = require("../services/auth");
const productRoute = express_1.default.Router();
// handlers
// routes
productRoute.get('/product/', productHandler_1.indexAll);
productRoute.get('/product/find/:productId', productHandler_1.showProduct);
productRoute.post('/product/create/:userId', auth_1.putToken, auth_1.requireSignin, auth_1.isAuth, auth_1.isAdmin, productHandler_1.createProduct);
exports.default = productRoute;
