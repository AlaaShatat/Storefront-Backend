import { orderStorage } from "../../models/orderModel";

const orders = new orderStorage();

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
  