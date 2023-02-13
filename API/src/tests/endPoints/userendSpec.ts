import supertest from 'supertest';

import app from '../../server';
import { User } from '../../types/User';

let token = '';
const request = supertest(app);
const user = {
  firstName: 'test',
  lastName: 'test',
  hashedPass: 'test',
  email: 'test@test.com',
  isAdmin: 1,
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
        //console.log("Error Signin up",err);
        if (err) {
          console.log(`Error creating the user ${err}`);
          done.fail();
        } else done();
      });
  });
  it('respond with 200 signedin', async (): Promise<void> => {
    const res = await request
      .post('/api/user/signin')
      .send({ email: 'test@test.com', pass: 'test' })
      .set('Accept', 'application/json');
    token = '' + res.body.token;
    expect(res.status).toBe(200);
  });

  it('get all users', async (): Promise<void> => {
    const res = await request
      .get('/api/user/4')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
  it('get user by id', async (): Promise<void> => {
    //console.log(`token is ${token}`);
    const res = await request
      .get('/api/user/find/4')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    //console.log(res.body);
    expect(res.status).toBe(200);
  });
  it('signout user with 200 status post /api/user/signout', async (): Promise<void> => {
    const res = await request.post('/api/user/signout');
    expect(res.status).toBe(200);
  });
});
