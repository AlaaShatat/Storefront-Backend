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
exports.userStorage = void 0;
const database_1 = __importDefault(require("../database"));
class userStorage {
    // show all users
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                // release connections
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
            ;
        });
    }
    // show a user
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id={$1}';
                const result = yield conn.query(sql, [Number(id)]);
                // release connections
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get user. Error: ${err}`);
            }
            ;
        });
    }
    // sign up 
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstName, lastName, hashedPass) VALUES $(1,2,3,4) RETURNING *';
                const result = yield conn.query(sql, [user.firstName, user.lastName, user.hashedPass]);
                // release connections
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
            ;
        });
    }
}
exports.userStorage = userStorage;
;
