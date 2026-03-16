const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult, body } = require("express-validator");

async function register(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { nombre, email, password } = req.body;

    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    const userRegister = new User({
      nombre,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await userRegister.save();
    res.status(200).json({ userRegister });
  } catch (error) {
    res.status(404).json({ msj: error.message });
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body; // ← parámetros enviados

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Incorrect username and password " });
    }

    let passwordValido = await bcrypt.compare(password, userExist.password);
    if (!passwordValido) {
      return res.status(400).json({ msg: "Incorrect username and password " });
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        email: userExist.email,
        nombre: userExist.nombre
      },
        process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.status(200).json({ token }); // temporal, luego aquí va el JWT
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
}

module.exports = { register, login };
