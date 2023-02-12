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
exports.createProduct = exports.showProduct = exports.indexAll = void 0;
const product_1 = require("../models/product");
// get all products
const indexAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = new product_1.productStorage();
        const products = yield allProducts.index();
        yield res.status(200).send(products);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't load products" });
    }
    ;
});
exports.indexAll = indexAll;
// get product by id 
const showProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the id from params
    const id = req.params.productId ? Number(req.params.productId) : -1;
    try {
        const allProducts = new product_1.productStorage();
        const product = yield allProducts.show(id);
        yield res.status(200).send(product);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't find product" });
    }
    ;
});
exports.showProduct = showProduct;
// create new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the product data from req body
    const pName = req.body.pName ? req.body.pName : null;
    const price = req.body.price ? Number(req.body.price) : -1;
    // check if any is null 
    if (pName == null || price < 0) {
        yield res.status(400).send({ 'error': "missing information" });
    }
    const reqProduct = {
        id: null,
        pname: pName,
        price: price
    };
    try {
        const allProducts = new product_1.productStorage();
        const product = yield allProducts.create(reqProduct);
        yield res.status(200).send(product);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't find Product" });
    }
    ;
});
exports.createProduct = createProduct;
