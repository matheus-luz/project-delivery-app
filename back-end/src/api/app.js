const express = require('express');
const cors = require('cors');
const error = require('../middlewares/error');
const LoginRouter = require('../routes/Login');
const RegisterRouter = require('../routes/Register');
const AdminRouter = require('../routes/Admin');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', LoginRouter);

app.use('/register', RegisterRouter);

app.use('/admin', AdminRouter);

app.use(error);

module.exports = app;
