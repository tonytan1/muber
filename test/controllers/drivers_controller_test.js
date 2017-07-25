const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('Driver controller', () => {
    it('Post to /api/drivers create a new driver', (done) => {
        request(app)
            .post('/api/drivers')
            .send({
                email: 'test@test.com'
            })
            .end(() => {
                done();
            });
    });
});