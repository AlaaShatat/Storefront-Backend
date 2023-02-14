import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);
const order = {
  product_number: 5,
  complete_status: false,
  products: [
    {
      product_id: 1,
      product_qty: 2,
    },
    {
      product_id: 2,
      product_qty: 3,
    },
  ],
};
let token: string = '';
let userId: string = '1';
let orderId: number = 1;
const user = {
  firstName: 'test',
  lastName: 'test',
  hashedPass: 'test',
  email: 'order@test.com',
  isAdmin: 1,
};

describe('Test API order endpoint', () => {
  // should signin first

  beforeAll(async () => {
    const res1 = await request
      .post('/api/user/signup')
      .send({
        firstName: 'test',
        lastName: 'test',
        hashedPass: 'test',
        email: 'order@test.com',
        isAdmin: 1,
      })
      .set('Accept', 'application/json');

    const res = await request
      .post('/api/user/signin')
      .send({ email: 'order@test.com', pass: 'test' })
      .set('Accept', 'application/json');

    token = '' + res.body.token;
    userId = res.body.user.id;
  });

  it('get all orders with 200 status ', async (): Promise<void> => {
    const res = await request
      .get(`/api/order/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('show current order without details with 200 status ', async (): Promise<void> => {
    const res = await request
      .get(`/api//order/find/current/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    console.log(res.status);
    expect(res.status).toBe(200);
  });

  it('show current order with details for user with 200 status', async (): Promise<void> => {
    const res = await request
      .get(`/api/order/find/current/details/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
