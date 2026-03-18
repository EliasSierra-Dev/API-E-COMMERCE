const { validationResult } = require("express-validator");
const Producto = require("../models/product_model");
const mongoose = require("mongoose");

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
     if (!producto) {  
  return res.status(404).json({ msg: 'El producto no existe' });
}

    res.status(200).json({ msg: "Producto actualizado", producto });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      msg: "El usuario no existe",
    });
  }
  try {
    const productDelete = await Producto.findByIdAndDelete(id);

    if (!productDelete) {
      return res.status(404).json({ msg: "El producto no existe" });
    }
    res.status(200).json({
      msg: "Producto eliminado"
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
}

async function listProducts(req, res) {
  try {
      let products = await  Producto.find();
      if(products.length === 0){
        return res.status(400).json({
          msg: 'No existen productos'
        })
      }
      return res.status(200).json(products)
    
  } catch (error) {
    res.status(500).json({
      msg: error.message
    })
    
  }
  
}

module.exports = { registerProduct, updateProduct, deleteProduct, listProducts };
