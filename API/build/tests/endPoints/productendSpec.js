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
let token = '';
let userId = 1;
let productId = 1;
describe('Test API product endpoint', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield request
            .post('/api/user/signup')
            .send({
            firstName: 'test',
            lastName: 'test',
            hashedPass: 'test',
            email: 'product@test.com',
            isAdmin: 1,
        })
            .set('Accept', 'application/json');
        const res = yield request
            .post('/api/user/signin')
            .send({ email: 'product@test.com', pass: 'test' })
            .set('Accept', 'application/json');
        token = '' + res.body.token;
        userId = res.body.user.id;
    }));
    it('get all products with 200 status get /api/product', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/product');
        expect(res.status).toBe(200);
    }));
    it('should create new product ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post(`/api/product/create/${userId}`)
            .send(product)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        productId = res.body.id;
        expect(res.status).toBe(200);
    }));
    it('show one product with 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/api/product/find/${productId}`);
        expect(res.status).toBe(200);
    }));
});
