// models/Item.js

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;
