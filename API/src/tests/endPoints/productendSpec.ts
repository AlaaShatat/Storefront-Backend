import supertest from "supertest";

import app from "../../server";

const request = supertest(app);
const product = {
    "pName":"test",
    "price":5,
};
describe('Test API product endpoint', () => {
    it('get all products with 200 status get /api/product', async (): Promise<void> => {
        const res = await request.get('/api/product');
        expect(res.status).toBe(200);
    });
    it('show one product with 200 status get /api/product/find/4', async (): Promise<void> => {
        const res = await request.get('/api/product/find/4');
        expect(res.status).toBe(200);
    });
});