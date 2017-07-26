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

    it('Put to /api/drivers/id edit an existing drivers', (done) => {
        const driver = new Driver({
            email: 't@t.com'
        });

        driver.save().then(() => {
            request(app)
                .put('/api/drivers/' + driver._id)
                .send({
                    driving: true
                })
                .end(() => {
                    Driver.findById(driver._id)
                        .then(driver => {
                            console.log(driver);
                            assert(driver.driving === true);
                            done();
                        })
                })
        });
    });
});