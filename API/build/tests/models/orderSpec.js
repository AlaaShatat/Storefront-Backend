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
    it('should create new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = {
            id: null,
            user_id: 4,
            product_number: 3,
            complete_status: false
        };
        const res = yield orders.create(order);
        expect(res).toEqual({
            id: res.id,
            user_id: 4,
            product_number: 3,
            complete_status: false
        });
    }));
    it('should return all orders index', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield orders.index();
        expect(res.length).toBeGreaterThanOrEqual(0);
    }));
    it('should return current orders by specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield orders.showCurrentOrder(1);
        expect(res.length).toBeGreaterThanOrEqual(0);
    }));
});
