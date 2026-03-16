
const express = require('express');

const app = express();

// middlewares
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'))


module.exports = app;