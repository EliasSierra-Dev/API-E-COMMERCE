const express = require('express');
const {registerProduct, updateProduct, deleteProduct, listProducts} = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { check } = require('express-validator');
const product = express.Router();

product.post('/product' , authMiddleware, [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('precio', 'El es obligatorio').notEmpty(),
  check('descripcion', 'La es obligatoria').notEmpty(),
  check('cantidad', 'La cantidad es obligatorio').notEmpty(),
  check('categoria', 'La categoria es obligatoria').notEmpty()
], registerProduct)
  
product.put('/product/:id', authMiddleware, [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('precio', 'El es obligatorio').notEmpty(),
  check('descripcion', 'La es obligatoria').notEmpty(),
  check('cantidad', 'La cantidad es obligatorio').notEmpty(),
  check('categoria', 'La categoria es obligatoria').notEmpty()

], updateProduct)

product.delete('/product/:id', authMiddleware, deleteProduct);

product.get('/product', authMiddleware, listProducts);

module.exports = product;