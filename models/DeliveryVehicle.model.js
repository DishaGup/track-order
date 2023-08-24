const mongoose = require("mongoose");

const deliveryVehicleSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true },
    vehicleType: { type: String, enum: ["bike", "truck"], required: true },
    city: { type: String, required: true },
    activeOrdersCount: { type: Number, default: 0, max: 2 },
  },
  {
    timestamps: true,
  }
);

const DeliveryVehicleModel = mongoose.model(
  "DeliveryVehicle",
  deliveryVehicleSchema
);

module.exports = DeliveryVehicleModel;
