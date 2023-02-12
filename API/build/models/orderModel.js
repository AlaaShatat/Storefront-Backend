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
exports.orderStorage = void 0;
const database_1 = __importDefault(require("../database"));
class orderStorage {
    // show all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                // release connections
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
            ;
        });
    }
    // show order
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                // release connections
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get order. Error: ${err}`);
            }
            ;
        });
    }
    // get order open
    showCurrentOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=($1) AND complete_status=($2)';
                const result = yield conn.query(sql, [id, false]);
                // release connections
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get order. Error: ${err}`);
            }
            ;
        });
    }
    // create
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id, product_number, complete_status) VALUES ($1,$2,$3) RETURNING *';
                const result = yield conn.query(sql, [order.user_id, order.product_number, order.complete_status]);
                // release connections
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not insert the order. Error: ${err}`);
            }
            ;
        });
    }
}
exports.orderStorage = orderStorage;
;
