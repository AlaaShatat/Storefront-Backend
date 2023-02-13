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
const product_1 = require("../../models/product");
const products = new product_1.productStorage();
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(products.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(products.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(products.create).toBeDefined();
    });
    it('create should create new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            id: null,
            pname: "bag",
            price: 50
        };
        const res = yield products.create(product);
        expect(res).toBeDefined();
    }));
    it('index should return products', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield products.index();
        expect(res.length).toBeGreaterThanOrEqual(1);
    }));
    it('should return product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield products.show(1);
        expect(res).toBeDefined();
    }));
});
