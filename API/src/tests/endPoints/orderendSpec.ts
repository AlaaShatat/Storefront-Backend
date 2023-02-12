/*import supertest from "supertest";

import app from "../../server";

const request = supertest(app);
const order = {
    "product_number": 5,
    "complete_status": false,
    "products":[
        {
            "product_id":1,
            "product_qty":2
        },
        {
            "product_id":2,
            "product_qty":3
        }
    ]
};
describe('Test API endpoint', () => {
    // signup neworder
    it('create new order with 200 status post /api/order/create/1', async (): Promise<void> => {
        const response = await request.post('/api/order/create/1').send(order).set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });

    it('get all orders with 200 status get /api/order/1', async (): Promise<void> => {
        const res = await request.get('/api/order/1');
        expect(res.status).toBe(200);
    });

    it('get order by id with 200 status get /api/order/find/1', async (): Promise<void> => {
        const res = await request.get('/api//order/find/1');
        expect(res.status).toBe(200);
    });
    
    it('show current order without details with 200 status get /api/order/find/1', async (): Promise<void> => {
        const res = await request.get('/api//order/find/current/1');
        expect(res.status).toBe(200);
    });

    it('show current order with details for user with 200 status get /api/order/find/1', async (): Promise<void> => {
        const res = await request.get('/api/order/find/current/details/1');
        expect(res.status).toBe(200);
    });
});*/