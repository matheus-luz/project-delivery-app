const express = require('express');
const cors = require('cors');
const error = require('../middlewares/error');

const LoginRouter = require('../routes/Login');
const SellerRouter = require('../routes/Seller');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', LoginRouter);
app.use('/seller', SellerRouter);

app.use(error);

module.exports = app;
