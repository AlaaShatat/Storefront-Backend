import { orderStorage } from '../../models/orderModel';
import { Order } from '../../types/order';
import { userStorage } from '../../models/userStorage';
import { User } from '../../types/User';

const orders = new orderStorage();
const users = new userStorage();
describe('order Model', () => {
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
  it('should create new order', async () => {
    const user: User[] = await users.index();
    const order: Order = {
      id: null,
      user_id: Number(user[0].id),
      product_number: 3,
      complete_status: false,
    };

    const res: Order = await orders.create(order);
    expect(res).toEqual({
      id: res.id,
      user_id: res.user_id,
      product_number: 3,
      complete_status: false,
    });
  });

  it('should return all orders index', async () => {
    const res: Order[] = await orders.index();
    expect(res.length).toBeGreaterThanOrEqual(0);
  });

  it('should return current orders by specific user', async () => {
    const res: Order[] = await orders.showCurrentOrder(1);
    expect(res.length).toBeGreaterThanOrEqual(0);
  });
});
