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
let token = '';
let userId = '1';
let orderId = 1;
const user = {
    firstName: 'test',
    lastName: 'test',
    hashedPass: 'test',
    email: 'order@test.com',
    isAdmin: 1,
};
describe('Test API order endpoint', () => {
    // should signin first
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield request
            .post('/api/user/signup')
            .send({
            firstName: 'test',
            lastName: 'test',
            hashedPass: 'test',
            email: 'order@test.com',
            isAdmin: 1,
        })
            .set('Accept', 'application/json');
        const res = yield request
            .post('/api/user/signin')
            .send({ email: 'order@test.com', pass: 'test' })
            .set('Accept', 'application/json');
        token = '' + res.body.token;
        userId = res.body.user.id;
    }));
    it('get all orders with 200 status ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/order/${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
    it('show current order without details with 200 status ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api//order/find/current/${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        console.log(res.status);
        expect(res.status).toBe(200);
    }));
    it('show current order with details for user with 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/order/find/current/details/${userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
});
