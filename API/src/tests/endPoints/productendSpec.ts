import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);
const product = {
  pName: 'test',
  price: 5,
};
const user = {
  firstName: 'test',
  lastName: 'test',
  hashedPass: 'test',
  email: 'product@test.com',
  isAdmin: 1,
};
let token: string = '';
let userId: number = 1;
let productId: number = 1;
describe('Test API product endpoint', () => {
  beforeAll(async () => {
    const res1 = await request
      .post('/api/user/signup')
      .send({
        firstName: 'test',
        lastName: 'test',
        hashedPass: 'test',
        email: 'product@test.com',
        isAdmin: 1,
      })
      .set('Accept', 'application/json');

    const res = await request
      .post('/api/user/signin')
      .send({ email: 'product@test.com', pass: 'test' })
      .set('Accept', 'application/json');

    token = '' + res.body.token;
    userId = res.body.user.id;
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
