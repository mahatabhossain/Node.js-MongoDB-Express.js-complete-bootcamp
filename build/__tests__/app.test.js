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
// __tests__/app.test.js
const request = require('supertest');
const app = require('../app');
const userModel = require('../model');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
describe('Testing GET user API', () => {
    test('GET: /users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get('/');
        expect(response.statusCode).toBe(200);
        // expect(response.body).toEqual({});
    }));
});
describe('Testing Mongodb response', () => {
    let connection, mongod, db;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongod = new MongoMemoryServer();
        const mongoUri = yield mongod.getUri();
        connection = mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.connection.db;
    }));
    it('It should get the user data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = userModel.find();
        // console.log(data)
        expect(data).toEqual(data);
    }));
});
//# sourceMappingURL=app.test.js.map