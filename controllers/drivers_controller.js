const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({hi: 'there'});
    },

    create(req, res) {
        const driverPros = req.body; // todo save

        Driver.create(driverPros)
        .then(driver => {
            res.send(driver);
        })
    }
};