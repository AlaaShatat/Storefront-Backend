"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../../models/orderModel");
const orders = new orderModel_1.orderStorage();
describe("order Model", () => {
    it('should have an index method', () => {
        expect(orders.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orders.show).toBeDefined();
    });
    it('should have a show open orders method', () => {
        expect(orders.showCurrentOrder).toBeDefined();
    });
    it('should have a create method', () => {
        expect(orders.create).toBeDefined();
    });
});
