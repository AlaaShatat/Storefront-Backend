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
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCurrentOrderDetails = exports.showCurrentOrder = exports.createOrder = exports.showOrder = exports.indexAll = void 0;
const orderModel_1 = require("../models/orderModel");
const order_productsHandler_1 = require("../services/order_productsHandler");
// get all orders
const indexAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = new orderModel_1.orderStorage();
        const orders = yield allOrders.index();
        yield res.status(200).send(orders);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't load orders" });
    }
    ;
});
exports.indexAll = indexAll;
// get order by id 
const showOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the id from params
    const id = req.params.orderId ? Number(req.params.orderId) : -1;
    try {
        const allOrders = new orderModel_1.orderStorage();
        const order = yield allOrders.show(id);
        yield res.status(200).send(order);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't find order" });
    }
    ;
});
exports.showOrder = showOrder;
// get current order by user id 
const showCurrentOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the userid from params
    const id = req.params.userId ? Number(req.params.userId) : -1;
    try {
        const allOrders = new orderModel_1.orderStorage();
        const order = yield allOrders.showCurrentOrder(id);
        yield res.status(200).send(order);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't find order" });
    }
    ;
});
exports.showCurrentOrder = showCurrentOrder;
// show with details
const showCurrentOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the userid from params
    const id = req.params.userId ? Number(req.params.userId) : -1;
    try {
        const allOrders = new orderModel_1.orderStorage();
        const orders = yield allOrders.showCurrentOrder(id);
        let returnedProducts = [];
        const orderproductsStorage = new order_productsHandler_1.OrderProductstorage();
        // store the products into the order product
        for (let i = 0; i < orders.length; i++) {
            const ret = yield orderproductsStorage.show(Number(orders[i].id));
            for (let j = 0; j < ret.length; j++)
                returnedProducts.push(ret[j]);
        }
        console.log(returnedProducts);
        yield res.status(200).send(returnedProducts);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't find order" });
    }
    ;
});
exports.showCurrentOrderDetails = showCurrentOrderDetails;
// create new product
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the order data from req body
    const user_id = req.params.userId ? Number(req.params.userId) : -1;
    const product_number = req.body.product_number ? req.body.product_number : -1;
    const complete_status = req.body.complete_status ? Boolean(req.body.complete_status) : false;
    const product_list = req.body.products ? req.body.products : [];
    // check if any is null 
    if (product_number <= 0 || user_id <= 0 || product_list.length < 1) {
        yield res.status(400).send({ 'error': "missing information" });
    }
    const reqOrder = {
        id: null,
        user_id: user_id,
        product_number: product_number,
        complete_status: complete_status
    };
    try {
        const allOrders = new orderModel_1.orderStorage();
        const order = yield allOrders.create(reqOrder);
        let returnedProducts = [];
        const orderproductsStorage = new order_productsHandler_1.OrderProductstorage();
        // store the products into the order product
        for (let i = 0; i < product_list.length; i++) {
            let reqProductOrder = {
                id: null,
                order_id: Number(order.id),
                product_id: Number(product_list[i].product_id),
                quantity: Number(product_list[i].product_qty)
            };
            const ret = yield orderproductsStorage.create(reqProductOrder);
            returnedProducts.push(ret);
        }
        console.log(returnedProducts);
        yield res.status(200).json({ order, "orderDetails": returnedProducts });
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't find Product" });
    }
    ;
});
exports.createOrder = createOrder;
