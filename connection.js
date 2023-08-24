const mongoose = require("mongoose");
require("dotenv").config();

// enter MONGO_URL in .env file

const connection = mongoose.connect(process.env.MongoDB_URL);


module.exports = connection;
