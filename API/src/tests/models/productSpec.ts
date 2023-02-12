import { productStorage } from "../../models/product";

const products = new productStorage();

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
  