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
exports.OrderProductstorage = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductstorage {
    // show all products in all orders
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM order_products';
                const result = yield conn.query(sql);
                // release connections
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get order products. Error: ${err}`);
            }
            ;
        });
    }
    // show products of a given order
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM order_products WHERE order_id=($1)';
                const result = yield conn.query(sql, [id]);
                // release connections
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get order products for this order. Error: ${err}`);
            }
            ;
        });
    }
    // create
    create(orderproducts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *';
                const result = yield conn.query(sql, [orderproducts.order_id, orderproducts.product_id, orderproducts.quantity]);
                // release connections
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not insert the order product. Error: ${err}`);
            }
            ;
        });
    }
}
exports.OrderProductstorage = OrderProductstorage;
;
