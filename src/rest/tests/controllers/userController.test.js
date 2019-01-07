import app from '../../../app'
const request = require('supertest')(app.callback());
const User = require('../../../models/userModel');
const connection = require('../../../config/database/database_tests');
const {sanitizeTestObject} = require('../../../config/tests/sanitizeTestObject');

const dropUserCollection = async () => User.remove();


let user = {
    '_id': 'TESTOBJECT01',
    'name': 'Jhon',
    'email': 'jhon@email.com',
    'userName': 'jhon',
    'password': '123456'
};


beforeAll(() => {

dropUserCollection();

});

afterAll(() => {

connection.disconect();
});



describe('Users Tests', () => {

    describe('GET Method with no users registered.', () => {

        test('It should return no one user.', async () => {

            const res = await request.get('/api/users');
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(204);


        });
    });

    describe('POST method', () => {
        test('It should create a new user.', async () => {

           const res = await request.post('/api/users').send(user);
           expect(sanitizeTestObject(res.body)).toMatchSnapshot();
           expect(res.status).toEqual(201);


        });
        test('It should not create a new user with the same email.', async () => {

            const res = await request.post('/api/users').send(user);
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(403);

        });
        test('It should not create a new user with  a already exists username.', async () => {

            user.email = "other@email.com";
            const res = await request.post('/api/users').send(user);
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(406);

        });
    });

    describe('GET method', () => {

        test('It should return all users.', async () => {

            const res = await request.get('/api/users');
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(200);

        });

        test('It should not return a user with the wrong ID passed as parameter.', async () => {

            const res = await request.get(`/api/users/TESTOBJECT02`);
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(404);

        });
        test('It should return a specific user according the ID passed as parameter.', async () => {

            const res = await request.get(`/api/users/${user._id}`);
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(200);

        });
    });

    describe('PUT method', () => {

        test('It should not update a user with the wrong ID passed as parameter.', async () => {

            const res = await request.put(`/api/users/TESTOBJECT02`).send({'name': 'Jhon Doe'});
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(404);
        });
        test('It should update a specific user according the ID passed as parameter.', async () => {

            const res = await request.put(`/api/users/${user._id}`).send({'name': 'Jhon Doe'});
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(200);

        });
    });

    describe('DELETE method', () => {
        test('It should not delete a user with the wrong ID passed as parameter.', async () => {

            const res = await request.delete(`/api/users/TESTOBJECT02`);
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(404);

        });
        test('It should return a specific user according the ID passed as parameter.', async () => {

            const res = await request.delete(`/api/users/${user._id}`);
            expect(sanitizeTestObject(res.body)).toMatchSnapshot();
            expect(res.status).toEqual(204);

        });

    });
});