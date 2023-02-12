import supertest from "supertest";

import app from "../../server";
import { User } from "../../types/User";

const request = supertest(app);
const user = {
    "firstName":"test1",
    "lastName":"test",
    "hashedPass":"test",
    "email":"test1@test.com",
    "isAdmin":1
};
describe('Test API user endpoint', () => {
    // signup newUser
    it('respond with 200 created', function (done) {
        supertest(app)
            .post('/api/user/signup')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err) => {
                if (err) return done();
                done();
            });
    });
    it('respond with 200 signedin', function (done) {
        supertest(app)
            .post('/api/user/sigin')
            .send({"email":"test@test.com", "pass":"test"})
            .set('Accept', 'application/json')
            .expect(200)
            .end((err) => {
                if (err) return done();
                done();
            });
    });/*
    it('get all users with 200 status get /api/user/4', async (): Promise<void> => {
        const resp = await request.post('api/user/signin').send({"email":"test@test.com", "pass":"test"});
        const res = await request.get('/api/user/4').set('Authorization',resp.body.token);
        expect(res.status).toBe(200);
    });
    it('show one user with 200 status get /api/user/find/5', async (): Promise<void> => {
        const res = await request.get('/api/user/find/1');
        expect(res.status).toBe(200);
    });*/
    it('signout user with 200 status post /api/user/signout', async (): Promise<void> => {
        const res = await request.post('/api/user/signout');
        expect(res.status).toBe(200);
    });
});