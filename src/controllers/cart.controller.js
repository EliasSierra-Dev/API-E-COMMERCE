const mongoose = require("mongoose");
const Cart = require("../models/shopping_cart");
const Producto = require("../models/product_model");
const { validationResult } = require("express-validator");

async function addCart(req, res) {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let product = await Producto.findById(id);

    if (!product) {
      return res.status(400).json({
        msg: "El producto no existe",
      });
    }

    const { cantidad } = req.body;

    if (cantidad > product.cantidad) {
      return res.status(400).json({
        msg: "La compra es mayor a la cantidad disponible",
      });
    }

    let carrito = await Cart.findOne({
      usuario: req.user.id,
      estado: "activo",
    })
     

    if (!carrito) {
      carrito = new Cart({
        usuario: req.user.id,
        productos: [{ producto: id, cantidad }],
        total: product.precio * cantidad,
        estado: "activo",
      });

      await carrito.save();
      res.status(201).json({ carrito });
    } else {
  
      let productoExiste = carrito.productos.find(
        (p) => p.producto.toString() === id,
      );

      if (productoExiste) {
        productoExiste.cantidad += cantidad;
      } else {
        carrito.productos.push({ producto: id, cantidad });
      }
      carrito.total += product.precio * cantidad;

      await carrito.save();
      res.status(200).json({ carrito });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
}


async function getCart(req, res) {
  try {
    let carrito = await Cart.findOne({ usuario: req.user.id })
      .populate("usuario", "nombre")
      .populate("productos.producto", "nombre precio");
    

     if (!carrito) {
      return res.status(400).json({
        msg: "No tienes un carrito activo",
      });
      } else {
        res.status(200).json({ carrito });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
}

async function deleteCart(req, res) {

  try {
    let carrito = await Cart.findOne({ usuario: req.user.id, estado: "activo" });
  if (!carrito) {
    return res.status(400).json({
      msg: "No tienes un carrito activo",
    });
  }

  await Cart.deleteOne({ usuario: req.user.id, estado: "activo" });
  res.status(200).json({ msg: "Carrito eliminado" });

}
catch (error) {
  res.status(500).json({
    msg: error.message,
  });
}
}


module.exports = { addCart, getCart, deleteCart };
