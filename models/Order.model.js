const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    price: { type: Number, required: true },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    deliveryVehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryVehicle",
      required: true,
    },
    isDelivered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Increment orderNumber using mongoose pre hook
orderSchema.pre("save", async function (next) {
  try {
    if (!this.orderNumber) {
      const latestOrder = await this.constructor.findOne(
        {},
        {},
        { sort: { orderNumber: -1 } }
      );
      const orderNumber = latestOrder
        ? parseInt(latestOrder.orderNumber, 10) + 1
        : 1;
      this.orderNumber = orderNumber.toString().padStart(4, "0");
    }
    next();
  } catch (error) {
    next(error);
  }
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
