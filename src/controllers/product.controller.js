const { validationResult } = require("express-validator");
const Producto = require("../models/product_model");
const mongoose = require('mongoose');

async function registerProduct(req, res) {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { nombre, precio, descripcion, cantidad, categoria } = req.body;
    let producRegister = new Producto({
      nombre,
      precio,
      descripcion,
      cantidad,
      categoria,
    });

    await producRegister.save();
    res.status(200).json({
      msg: "Producto registrado con éxito",
      producRegister,
    });
  } catch (error) {
    res.status(500).json({ msj: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion, cantidad, categoria } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    let producto = await Producto.findByIdAndUpdate(
      id,
      { nombre, precio, descripcion, cantidad, categoria },
      { new: true },
    );

    
    res.status(200).json({ msg: "Producto actualizado", producto });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = { registerProduct, updateProduct };
