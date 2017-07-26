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
    }
};