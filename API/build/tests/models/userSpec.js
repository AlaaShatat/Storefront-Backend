"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const users = new user_1.userStorage();
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
});
