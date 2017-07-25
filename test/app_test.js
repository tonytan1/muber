const assert = require('assert');
const request = require('supertest');// help to simulate requests
const app = require('../app');

describe('The express app', () => {
    it('handle a GET request to /api', (done) => {
        request(app)
        .get('/api')
        .end((err, response) => {
            assert(response.body.hi === 'there');
            done();
        });
    });
});