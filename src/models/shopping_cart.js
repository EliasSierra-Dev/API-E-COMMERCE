const mongoose = require("mongoose");


const cartSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.ObjectId,
        ref: "Producto",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true
      },
    }],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: 'activo'
    }
}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;