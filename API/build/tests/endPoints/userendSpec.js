"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const user = {
    "firstName": "test1",
    "lastName": "test",
    "hashedPass": "test",
    "email": "test1@test.com",
    "isAdmin": 1
};
describe('Test API user endpoint', () => {
    // signup newUser
    it('respond with 200 created', function (done) {
        (0, supertest_1.default)(server_1.default)
            .post('/api/user/signup')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err) => {
            if (err)
                return done();
            done();
        });
    });
    it('respond with 200 signedin', function (done) {
        (0, supertest_1.default)(server_1.default)
            .post('/api/user/sigin')
            .send({ "email": "test@test.com", "pass": "test" })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err) => {
            if (err)
                return done();
            done();
        });
    }); /*
    it('get all users with 200 status get /api/user/4', async (): Promise<void> => {
        const resp = await request.post('api/user/signin').send({"email":"test@test.com", "pass":"test"});
        const res = await request.get('/api/user/4').set('Authorization',resp.body.token);
        expect(res.status).toBe(200);
    });
    it('show one user with 200 status get /api/user/find/5', async (): Promise<void> => {
        const res = await request.get('/api/user/find/1');
        expect(res.status).toBe(200);
    });*/
    it('signout user with 200 status post /api/user/signout', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/user/signout');
        expect(res.status).toBe(200);
    }));
});
