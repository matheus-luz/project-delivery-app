const express = require('express');
const error = require('../middlewares/error');
const LoginRouter = require('../routes/Login');

const app = express();
app.use(express.json());

app.use('/login', LoginRouter);

app.use(error);

module.exports = app;
