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
exports.signout = exports.signin = exports.signup = exports.showUser = exports.indexAll = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// folders
const user_1 = require("../models/user");
dotenv_1.default.config();
const secret = process.env.JWT_SECRET || "secret_alo2a";
// get all users
const indexAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = new user_1.userStorage();
        const users = yield allUsers.index();
        yield res.status(200).send(users);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't load users" });
    }
    ;
});
exports.indexAll = indexAll;
// get user by id 
const showUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the id from params
    const id = req.params.userId ? Number(req.params.userId) : -1;
    console.log(id);
    try {
        const allUsers = new user_1.userStorage();
        const user = yield allUsers.show(id);
        yield res.status(200).send(user);
    }
    catch (err) {
        yield res.status(400).send({ 'error': "couldn't find user" });
    }
    ;
});
exports.showUser = showUser;
// create new user
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user data from req body
    const fName = req.body.firstName ? req.body.firstName : null;
    const lName = req.body.lastName ? req.body.lastName : null;
    const pass = req.body.hashedPass ? req.body.hashedPass : null;
    const email = req.body.email ? req.body.email : null;
    const isAdmin = req.body.isAdmin ? Number(req.body.isAdmin) : 0;
    // check if any is null 
    if (fName == null || lName == null || pass == null || email == null) {
        yield res.status(400).send({ 'error': "missing information" });
    }
    const allUsers = new user_1.userStorage();
    // check if email already exists
    const emailFlag = yield allUsers.findByEmail(email);
    if (emailFlag) {
        yield res.status(400).send({ "error": "email already exists" });
    }
    else {
        // create instance to be sent
        const reqUser = {
            id: null,
            firstname: fName,
            lastname: lName,
            hashedpass: pass,
            email: email,
            isadmin: isAdmin
        };
        try {
            const user = yield allUsers.create(reqUser);
            yield res.status(200).send(user);
        }
        catch (err) {
            yield res.status(400).send({ 'error': "wrong information" });
        }
        ;
    }
});
exports.signup = signup;
// signin user
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the data from body
    const email = req.body.email ? req.body.email : null;
    const pass = req.body.pass ? req.body.pass : null;
    // check if any is null 
    if (pass == null || email == null) {
        yield res.status(400).send({ 'error': "missing information" });
    }
    else {
        // continue
        try {
            const allUsers = new user_1.userStorage();
            // check if email doesn't exist
            const returnedUser = yield allUsers.findByEmail(email);
            if (!returnedUser) {
                yield res.status(400).send({ "error": "email Doesn't exist" });
            }
            else {
                const user = yield allUsers.signinUser(email, pass);
                if (user) {
                    const { id, firstname, lastname, email, isadmin } = user;
                    // genrate token
                    const token = jsonwebtoken_1.default.sign({ id: user.id }, secret);
                    // add to in the cookie with expire date
                    res.cookie("token", token);
                    yield res.status(200).json({ token, user: { id, firstname, lastname, email, isadmin } });
                }
            }
        }
        catch (err) {
            yield res.status(400).send({ 'error': "wrong password" });
        }
        ;
    }
});
exports.signin = signin;
// signout 
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    yield res.status(200).send("signout");
});
exports.signout = signout;
