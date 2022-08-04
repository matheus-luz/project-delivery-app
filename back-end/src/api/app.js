const express = require('express');
const LoginRouter = require('../routes/Login');

const app = express();
app.use(express.json())

app.use('/login', LoginRouter)

module.exports = app;
