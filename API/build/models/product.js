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
exports.productStorage = void 0;
const database_1 = __importDefault(require("../database"));
class productStorage {
    // show all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                // release connections
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get products. Error: ${err}`);
            }
            ;
        });
    }
    // show a product
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                // release connections
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get product. Error: ${err}`);
            }
            ;
        });
    }
    // create
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO products (pname, price) VALUES ($1,$2) RETURNING *';
                const result = yield conn.query(sql, [product.pname, product.price]);
                // release connections
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not insert the product. Error: ${err}`);
            }
            ;
        });
    }
}
exports.productStorage = productStorage;
;
