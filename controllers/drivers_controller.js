const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({
            hi: 'there'
        });
    },

    create(req, res, next) {
        const driverPros = req.body;

        Driver.create(driverPros) // todo save
            .then(driver => {
                res.send(driver);
            })
            .catch(next); // error handler by middleware
    },

    edit(req, res, next) {
        const dirverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate(dirverId, driverProps)
            .then(() => {
                Driver.findById(dirverId);
            })
            .then(driver => res.send(driver))
            .catch(next); // error handler by middleware
    },

    delete(req, res, next) {
        const dirverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndRemove(dirverId, driverProps)
            .then(driver => res.status(204).send(driver))
            .catch(next); // error handler by middleware
    },

    index(req, res, next) {
        const { lng, lat } = req.query; // for example: 'http://google.com?lng=80&lat20'

        Driver.geoNear({
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }, {
                spherical: true,
                maxDistance: 200000
            })
            .then(driver => res.send(driver))
            .catch(next); // error handler by middleware
    }
};