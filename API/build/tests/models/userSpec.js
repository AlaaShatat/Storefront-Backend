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
const userStorage_1 = require("../../models/userStorage");
const users = new userStorage_1.userStorage();
describe("User Model", () => {
    it('should have an index method', () => {
        expect(users.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(users.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(users.create).toBeDefined();
    });
    it('create should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            id: null,
            firstname: "test",
            lastname: "test",
            hashedpass: "test",
            email: "jas@jas.com",
            isadmin: 1
        };
        const res = yield users.create(user);
        user.id = res.id;
        const { id, firstname, lastname, email, isadmin } = res;
        expect({ id, firstname, lastname, email, isadmin }).toBeDefined();
    }));
    it('index should return users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield users.index();
        const { id, firstname, lastname, email, isadmin } = res[0];
        expect(res.length).toBeGreaterThanOrEqual(0);
    }));
    it('should return user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield users.show(4);
        expect(res).toBeDefined;
    }));
});
