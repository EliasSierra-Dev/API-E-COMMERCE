const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  productos: [
    {
      producto: { type: mongoose.Schema.ObjectId, ref: "Producto" },
      cantidad: { type: Number, required: true },
    },
  ],

  total: {
    type: Number,
   
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  estado: {
    type: String,
    default: "pendiente",
  },
});

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
