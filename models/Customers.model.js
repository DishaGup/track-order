const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CustomerModel = mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;
