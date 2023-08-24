// index.js

const express = require("express");
const app = express();
const morgan = require("morgan");
var fs = require("fs");
const helmet = require("helmet");
var path = require("path");
const cors = require("cors");
const ItemRouter = require("./routes/itemRoute.route");
const connection = require("./connection");
const loggingMiddleware = require("./middlewares/loggingMiddleware.middleware");
const errorMiddleware = require("./middlewares/errorMiddleware.middleware");
const DeliveryVehicleRouter = require("./routes/deliveryVehicleRoutes.route");
const userRouter = require("./routes/userRoute.route");
const OrderRouter = require("./routes/orderRoutes.route");
const CustomerRouter = require("./routes/customerRoutes.route");
const authenticateToken = require("./middlewares/authMiddleware.middleware");
require("dotenv").config({ debug: true });

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// helmet for security purpose
app.use(helmet());

app.use(
  morgan(loggingMiddleware, {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.use("/api", userRouter);
// Use the routes
app.use("/api", ItemRouter);
app.use(authenticateToken);
// Use '/api' as the base URL for your routes
app.use("/api", DeliveryVehicleRouter);

app.use("/api", OrderRouter);
app.use("/api", CustomerRouter);

// Use the error middleware after all routes
app.use(errorMiddleware);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Backend connected to MongoDB");
  } catch (err) {
    console.log(err.message);
    console.log("Backend not connected to MongoDB");
  }

  console.log(`Server running at port : ${PORT} `);
});
