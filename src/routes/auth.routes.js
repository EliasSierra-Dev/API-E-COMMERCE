const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const { check } = require('express-validator');

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

module.exports = auth;
