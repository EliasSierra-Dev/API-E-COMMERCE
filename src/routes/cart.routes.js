

const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const {addCart, getCart, deleteCart} = require('../controllers/cart.controller');
const { check } = require('express-validator');


const cart = express.Router();

cart.post('/cart/:id', [], 
        check('cantidad', 'La cantidad es obligatoria').notEmpty(),
    authMiddleware, addCart);

cart.get('/cart', authMiddleware, getCart);

cart.delete('/cart/:id', authMiddleware, deleteCart);

module.exports = cart;