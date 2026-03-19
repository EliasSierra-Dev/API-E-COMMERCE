
const express = require('express');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/product.routes'));
app.use('/api', require('./routes/cart.routes'));
app.use('/api', require('./routes/order.routes'));

module.exports = app;