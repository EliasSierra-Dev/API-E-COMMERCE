const mongoose = require("mongoose");
const Cart = require("../models/shopping_cart");
const Producto = require("../models/product_model");

async function addCart(req, res) {
    
  const { id } = req.params;
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
    estado: "Activo",
  });

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
    // ¿el producto ya está en el carrito?
    let productoExiste = carrito.productos.find(
        p => p.producto.toString() === id
    );

    if(productoExiste) {
        // ← producto ya está, aumentar cantidad
        productoExiste.cantidad += cantidad;
    } else {
        // ← producto nuevo, agregar al array
        carrito.productos.push({ producto: id, cantidad });
    }

    // recalcular total
    carrito.total += product.precio * cantidad;

    await carrito.save();
    res.status(200).json({ carrito });
  }
    
} catch (error) {
    res.status(500).json({
        msg: error.message
    })
    
}
  
}
