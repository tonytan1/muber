const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = require('../../models/driver');

describe('Driver controller', () => {
    it('Post to /api/drivers create a new driver', (done) => {
        Driver.count().then(count => {
            request(app)
                .post('/api/drivers')
                .send({
                    email: 'test@test.com'
                })
                .end(() => {
                    Driver.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    })
                });
        });
    });
});