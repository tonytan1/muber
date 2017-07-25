const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express(); // it countains router, controller and model

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');

app.use(bodyParser.json()); // json to object
routes(app);

module.exports = app;