// routes/deliveryVehicleRoutes.js

const express = require("express");
const DeliveryVehicleRouter = express.Router();

const authenticateToken = require("../middlewares/authMiddleware.middleware");
const DeliveryVehicleModel = require("../models/DeliveryVehicle.model");

//DeliveryVehicleRouter.use(authenticateToken);

// Create a delivery vehicle
DeliveryVehicleRouter.post("/delivery-vehicles", async (req, res) => {
  try {
    const newDeliveryVehicle = await DeliveryVehicleModel.create(req.body);
    res.status(201).json(newDeliveryVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all delivery vehicles
DeliveryVehicleRouter.get("/delivery-vehicles", async (req, res) => {
  try {
    const deliveryVehicles = await DeliveryVehicleModel.find();
    res.json(deliveryVehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a single delivery vehicle
DeliveryVehicleRouter.get("/delivery-vehicles/:id", async (req, res) => {
  try {
    const deliveryVehicle = await DeliveryVehicleModel.findById(req.params.id);
    if (!deliveryVehicle) {
      return res.status(404).json({ message: "Delivery vehicle not found" });
    }
    res.json(deliveryVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a delivery vehicle
DeliveryVehicleRouter.put("/delivery-vehicles/:id", async (req, res) => {
  try {
    const updatedDeliveryVehicle = await DeliveryVehicleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDeliveryVehicle) {
      return res.status(404).json({ message: "Delivery vehicle not found" });
    }
    res.json(updatedDeliveryVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a delivery vehicle
DeliveryVehicleRouter.delete("/delivery-vehicles/:id", async (req, res) => {
  try {
    const deletedDeliveryVehicle = await DeliveryVehicleModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDeliveryVehicle) {
      return res.status(404).json({ message: "Delivery vehicle not found" });
    }
    res.json({ message: "Delivery vehicle deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = DeliveryVehicleRouter;
