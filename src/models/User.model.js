const mongoose = require("mongoose");

// Crea el molde del documento. Aquí defines qué campos va a tener un usuario en MongoDB
const UserSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    rol: {
      type: String,
      enum: ["admin", "cliente"],
      default: "cliente",
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema); // convierte tu esquema en un modelo que puedes usar para interactuar con la base de datos.

module.exports = User;
