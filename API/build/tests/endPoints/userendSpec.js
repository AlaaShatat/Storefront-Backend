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
let token = '';
let userId = 1;
const request = (0, supertest_1.default)(server_1.default);
const user = {
    firstName: 'test',
    lastName: 'test',
    hashedPass: 'test',
    email: 'test@test.com',
    isAdmin: 1,
};
describe('Test API user endpoint', () => {
    // signup newUser
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield request
            .post('/api/user/signup')
            .send({
            firstName: 'test',
            lastName: 'test',
            hashedPass: 'test',
            email: 'user@test.com',
            isAdmin: 1,
        })
            .set('Accept', 'application/json');
        const res = yield request
            .post('/api/user/signin')
            .send({ email: 'user@test.com', pass: 'test' })
            .set('Accept', 'application/json');
        token = '' + res.body.token;
        userId = res.body.user.id;
    }));
    it('respond with 200 created', function (done) {
        (0, supertest_1.default)(server_1.default)
            .post('/api/user/signup')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err) => {
            //console.log("Error Signin up",err);
            if (err) {
                console.log(`Error creating the user ${err}`);
                done.fail();
            }
            else
                done();
        });
    });
    it('respond with 200 signedin', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/api/user/signin')
            .send({ email: 'test@test.com', pass: 'test' })
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
    }));
    it('get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/user/${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
    it('get user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        //console.log(`token is ${token}`);
        const res = yield request
            .get(`/api/user/find/${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        //console.log(res.body);
        expect(res.status).toBe(200);
    }));
    it('signout user with 200 status post /api/user/signout', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/user/signout');
        expect(res.status).toBe(200);
    }));
});
