const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoro"],
  },
  cantidad: {
    type: Number,
    required: [true, "La cantidad es obligatorio"],
  },
  categoria: {
    type: String,
    requiredd: [true, "La categoria es obligatorio"],
  }
    
  }, {timestamps: true }
);

const Producto = mongoose.model('Producto', productSchema)

module.exports = Producto;
