import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);
const product = {
  pName: 'test',
  price: 5,
};
let token: string = '';
let userId: number = 1;
let productId: number = 1;
describe('Test API product endpoint', () => {
  it('should signin the user first', async (): Promise<void> => {
    const res = await request
      .post('/api/user/signin')
      .send({ email: 'test@test.com', pass: 'test' })
      .set('Accept', 'application/json');
    token = res.body.token;
    userId = res.body.user.id;
    expect(res.status).toBe(200);
  });
  it('get all products with 200 status get /api/product', async (): Promise<void> => {
    const res = await request.get('/api/product');
    expect(res.status).toBe(200);
  });
  it('should create new product ', async (): Promise<void> => {
    const res = await request
      .post(`/api/product/create/${userId}`)
      .send(product)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    productId = res.body.id;
    expect(res.status).toBe(200);
  });

  it('show one product with 200 status', async (): Promise<void> => {
    const res = await request.get(`/api/product/find/${productId}`);
    expect(res.status).toBe(200);
  });
});
