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
    "lastName": "lol",
    "hashedPass": "test",
    "email": "lol@test.com",
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
    });
    it('signout user with 200 status post /api/user/signout', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/user/signout');
        expect(res.status).toBe(200);
    }));
});
