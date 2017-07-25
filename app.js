const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express(); // it countains router, controller and model

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber');
}

app.use(bodyParser.json()); // json to object
routes(app);

//error handler
app.use((err, req, res, next) => { //next: goto next middleware
    res.status(422).send({ error: err.message});
})
module.exports = app;