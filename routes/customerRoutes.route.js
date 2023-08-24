// routes/customerRoutes.js

const express = require("express");
const CustomerRouter = express.Router();

const authenticateToken = require("../middlewares/authMiddleware.middleware");
const CustomerModel = require("../models/Customers.model");

//CustomerRouter.use(authenticateToken);

// Create a customer
CustomerRouter.post("/customers", async (req, res) => {
  try {
    const newCustomer = await CustomerModel.create(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all customers
CustomerRouter.get("/customers", async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a specific customer
CustomerRouter.get("/customers/:id", async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a customer
CustomerRouter.put("/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found." });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a customer
CustomerRouter.delete("/customers/:id", async (req, res) => {
  try {
    const deletedCustomer = await CustomerModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found." });
    }
    res.json({ message: "Customer deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = CustomerRouter;
