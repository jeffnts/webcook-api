//import app from '../../../app'
const app = require('../../../app')
const request = require('supertest')(app.callback())
import userModel from '../../../models/userModel'
const connection = require('../../../config/database/database_tests')
const {sanitizeTestObject} = require('../../../config/tests/sanitizeTestObject')

const dropUserCollection = async () => userModel.remove()


let user = {
    '_id': 'TESTOBJECT01',
    'name': 'Jhon',
    'email': 'jhon@email.com',
    'userName': 'jhon',
    'password': '123456'
}

const userLogin = {
  'userName': 'jhon',
  'password': '123456'
};

beforeAll(() => {

dropUserCollection()

});

afterAll(() => {

connection.disconect()
});



describe('Users Tests', () => {

    // describe('GET Method with no users registered.', () => {
    //
    //     test('It should return no one user.', async () => {
    //
    //         const res = await request.get('/api/users');
    //         expect(sanitizeTestObject(res.body)).toMatchSnapshot();
    //         expect(res.status).toEqual(403);
    //
    //
    //     });
    // });

    describe('POST method', () => {
        test('It should create a new user.', async () => {
           const res = await request.post('/api/user').send(user)
           expect(sanitizeTestObject(res.body)).toMatchSnapshot()
           expect(res.status).toEqual(201)


        });
        test('It should not create a new user with the same email.', async () => {

          const res = await request.post('/api/user').send(user)
          expect(sanitizeTestObject(res.body)).toMatchSnapshot()
          expect(res.status).toEqual(403)

        });
        test('It should not create a new user with  a already exists username.', async () => {

          user.email = "other@email.com"
          const res = await request.post('/api/user').send(user)
          expect(sanitizeTestObject(res.body)).toMatchSnapshot()
          expect(res.status).toEqual(406)

        });
    });

    describe('GET method', () => {

        test('It should not return all users if the user is not a admin.', async () => {

          let tokenRequest = await request.post('/api/auth/login').send(userLogin)
          let token = tokenRequest.body.token
          const res = await request.get('/api/users').set('token', token)
          expect(sanitizeTestObject(res.body)).toMatchSnapshot()
          expect(res.status).toEqual(403)

        });

        test('It should not return a user if he is not logged.', async () => {

          const res = await request.get('/api/user');
          expect(sanitizeTestObject(res.body)).toMatchSnapshot();
          expect(res.status).toEqual(401);

        });
        test('It should return a logged user according the tokken passed as parameter in the Header.', async () => {

          let tokenRequest = await request.post('/api/auth/login').send(userLogin)
          let token = tokenRequest.body.token
          const res = await request.get('/api/user').set('token', token)
          expect(sanitizeTestObject(res.body)).toMatchSnapshot()
          expect(res.status).toEqual(200)

        });
    });

    describe('PUT method', () => {

        test('It should not update a user if he is not logged.', async () => {

          const res = await request.put('/api/user').send({'name': 'Jhon Doe'})
          expect(sanitizeTestObject(res.body)).toMatchSnapshot()
          expect(res.status).toEqual(401)
        });
        test('It should update a logged user according the token passed as parameter in the Header.', async () => {

          let tokenRequest = await request.post('/api/auth/login').send(userLogin)
          let token = tokenRequest.body.token
          const res = await request.put('/api/user').send({'name': 'Jhon Doe'}).set('token', token)
          expect(sanitizeTestObject(res.body)).toMatchSnapshot()
          expect(res.status).toEqual(200)

        });
    });

    describe('DELETE method', () => {
        test('It should not delete a user if is not logged.', async () => {

          const res = await request.delete('/api/user')
          expect(sanitizeTestObject(res.body)).toMatchSnapshot()
          expect(res.status).toEqual(401)

        });
        test('It should delete a logged user according the token passed as parameter in the Header.', async () => {

          let tokenRequest = await request.post('/api/auth/login').send(userLogin)
          let token = tokenRequest.body.token
          const res = await request.delete('/api/user').set('token', token)
          expect(sanitizeTestObject(res.body)).toMatchSnapshot()
          expect(res.status).toEqual(204)

        });

    });
});