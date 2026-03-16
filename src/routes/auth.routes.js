const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const authMiddleware = require('../middlewares/auth.middleware');
const { check } = require('express-validator');
const user = require("../models/User.model");

const auth = express.Router();

auth.post('/register', [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('email', 'El email no es válido').isEmail(),
  check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 10 })
], register)

auth.post('/login', [
  check('email', 'El email no es válido').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty()
], login)

// Ruta protegida de prueba ← agregar
auth.get('/perfil', authMiddleware, (req, resp) =>{
  resp.json({
    msg: 'Ruta protegida ✅',
    user: req.user
  })
});

module.exports = auth;
