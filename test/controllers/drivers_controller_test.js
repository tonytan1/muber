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
                            assert(driver.driving === true);
                            done();
                        })
                })
        });
    });

    it('Delete to /api/drivers/id can delete a driver', (done) => {
        const driver = new Driver({ email: 'test@test.com'});

        driver.save().then(() => {
            request(app)
            .delete('/api/drivers/' + driver._id)
            .end((driver) => {
                assert(driver === null);
                done();
            })
        })
    });

    it('GET to /api/drivers/index finds drivers in a location', (done) => {
        const seattleDriver = new Driver({
            email: 'seattleDriver@test.com',
            geometry: { type: 'Point', coordinates: [-122.47599902, 47.6147628] }
        });

        const miamiDriver = new Driver({
            email: 'miamiDriver@test.com',
            geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
        });

        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() => {
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err, res) => {
                        assert(res.body.length === 1);
                        assert(res.body[0].obj.email === 'miamiDriver@test.com');
                        done();
                    })
            })
    });
});