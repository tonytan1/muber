const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('warning', error);
        });
});

beforeEach((done) => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
    .then(() => {
        drivers.ensureIndex({ 'geometry.coordinates': '2dsphere'});
    }) // make sure geo index won't be dropped
    .then(() => done())
    .catch(() => done());
});