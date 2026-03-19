const express = require('express');

const ordersRouter = express.Router();
const { createOrder } = require('../controllers/orders.controller');
const Orders = require('../models/orders');
const authMiddleware = require('../middlewares/auth.middleware');

// Crear una nueva orden
ordersRouter.post('/orders', authMiddleware, createOrder);

module.exports = ordersRouter;


                  


