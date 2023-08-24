const express = require("express");
const ItemModel = require("../models/Items.model");
const authenticateToken = require("../middlewares/authMiddleware.middleware");

const ItemRouter = express.Router();

// Read all items
ItemRouter.get("/items", async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a single item
ItemRouter.get("/items/:id", async (req, res) => {
  try {
    const item = await ItemModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ItemRouter.use(authenticateToken);
// Create an item
ItemRouter.post("/items", async (req, res) => {
  try {
    const newItem = await ItemModel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an item
ItemRouter.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an item
ItemRouter.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = ItemRouter;
