const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");

// Crear una nueva orden

async function createOrder(req, res) {
  try {
    const { productos, total } = req.body; // ✅ del body
    const usuario = req.user.id; // ✅ del token
    const newOrder = new Orders({
      productos,
      total,
      usuario,
    });
    const savedOrder = await newOrder.save();
    const populatedOrder = await Orders.findById(savedOrder._id)
    .populate('usuario', 'nombre')
    .populate('productos.producto', 'nombre');

res.status(201).json(populatedOrder);
    res.status(201).json(savedOrder);
  } catch (error) {
     console.log(error);
    res.status(500).json({ message: "Error al crear la orden" });
  }
}

async function getOrders(req, res) {   


    try {
        const orders = await Orders.find().populate('usuario', 'nombre').populate('productos.producto', 'nombre');
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las ordenes" });
    }
}

async function getOrderById(req, res) {
    const { id } = req.params;

    try {
        const order = await
            Orders.findById(id)
                .populate('usuario', 'nombre')
                .populate('productos.producto', 'nombre');
        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }   
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener la orden" });
    }
}

async function updateOrderStatus(req, res) {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
        order.estado = estado;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el estado de la orden" });
    }
}

async function deleteOrder(req, res) {
    const { id } = req.params;  
    try {
        const order = await Orders.find
ById(id);
        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }       
        await order.remove();
        res.json({ message: "Orden eliminada correctamente" });
    }
        catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar la orden" });
    }
}

async function getUserOrders(req, res) {
    const usuario = req.user.id; // ✅ del token        
    try {
        const orders = await Orders.find({ usuario }).populate('productos.producto', 'nombre');
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las ordenes del usuario" });
    }
}

async function getOrdersByStatus(req, res) {
    const { estado } = req.params;  
    try {
        const orders = await Orders.find({ estado }).populate('usuario', 'nombre').populate('productos.producto', 'nombre');
        res.json(orders);
    }
        catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las ordenes por estado" });
    }   
}

async function limpiarCarrito(req, res) {
    const usuario = req.user.id;    
    try {
        const orders = await Orders.findOneAndDelete({ usuario, estado: "pendiente" });
        if (!orders) {
            return res.status(404).json({ message: "No hay orden pendiente para este usuario" });
        }

        res.json({ message: "Carrito limpiado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al limpiar el carrito" });
    }       
}


module.exports = {
  createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder, getUserOrders, getOrdersByStatus, limpiarCarrito
};
