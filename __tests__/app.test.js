// __tests__/app.test.js
const request = require('supertest');
const app = require('../app');
const userModel = require('../model')

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');


describe('Testing GET user API', () => {
  test('GET: /users', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    // expect(response.body).toEqual({});
  });
});

describe('Testing Mongodb response', () => {
  let connection, mongod, db

  beforeAll(async () => {
    mongod = new MongoMemoryServer()
    const mongoUri = await mongod.getUri()

    connection = mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    db = connection.connection.db;
  })


  it('It should get the user data', async () => {
    const data = userModel.find()
    // console.log(data)
    expect(data).toEqual(data)
  })
})
