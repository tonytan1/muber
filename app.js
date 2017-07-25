const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express(); // it countains router, controller and model

app.use(bodyParser.json()); // json to object
routes(app);

module.exports = app;