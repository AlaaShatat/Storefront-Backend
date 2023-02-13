import { orderStorage } from "../../models/orderModel";
import { Order } from "../../types/order";

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
    it('should create new order',async () => {
      const order: Order={
        id: null,
        user_id:4,
        product_number:3,
        complete_status:false
      };

      const res: Order= await orders.create(order);
      expect(res).toEqual({
        id: res.id,
        user_id:1,
        product_number:3,
        complete_status:false
      });

    });
    
    it('should return all orders index',async () => {
      const res: Order[]= await orders.index();
      expect(res.length).toBeGreaterThanOrEqual(0);
    });

    it('should return current orders by specific user',async () => {
      const res: Order[]= await orders.showCurrentOrder(1);
      expect(res.length).toBeGreaterThanOrEqual(0);
    });
});