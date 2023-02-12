"use strict";
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
});
