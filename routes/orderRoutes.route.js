// routes/orderRoutes.js

const express = require("express");
const OrderRouter = express.Router();
const authenticateToken = require("../middlewares/authMiddleware.middleware");
const CustomerModel = require("../models/Customers.model");
const DeliveryVehicleModel = require("../models/DeliveryVehicle.model");
const OrderModel = require("../models/Order.model");
const ItemModel = require("../models/Items.model");

//OrderRouter.use(authenticateToken);

// Create an order
OrderRouter.post("/orders", async (req, res) => {
  try {
    const { itemId, customerId } = req.body;
    const customer = await CustomerModel.findById(customerId);
    const deliveryVehicle = await DeliveryVehicleModel.findOne({
      city: customer.city,
      activeOrdersCount: { $lt: 2 },
    });

    if (!deliveryVehicle) {
      return res
        .status(400)
        .json({ message: "No available delivery vehicle." });
    }

    const item = await ItemModel.findById(itemId);
    const order = new OrderModel({
      itemId: item._id,
      price: item.price,
      customerId,
      deliveryVehicleId: deliveryVehicle._id,
    });

    deliveryVehicle.activeOrdersCount++;
    await order.save();
    await deliveryVehicle.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark an order as delivered
OrderRouter.patch("/orders/:id/delivered", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.isDelivered = true;
    const deliveryVehicle = await DeliveryVehicleModel.findById(
      order.deliveryVehicleId
    );

    if (deliveryVehicle) {
      deliveryVehicle.activeOrdersCount--;
      await deliveryVehicle.save();
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all orders
OrderRouter.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a single order
OrderRouter.get("/orders/:id", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an order
OrderRouter.put("/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an order
OrderRouter.delete("/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = OrderRouter;
