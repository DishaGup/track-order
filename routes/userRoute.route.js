const express = require("express");
const UsersModel = require("../models/Users.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); //for hashing of password

// User login route
userRouter.post("/users/login", async (req, res) => {
  const { name, password } = req.body;
  const user = await UsersModel.findOne({ name, password });
  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, "syook", {
            expiresIn: "1h",
          });

          res.status(200).json({ token });
        } else {
          res.status(401).send({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User registration route
userRouter.post("/users/register", async (req, res) => {
  const { name, phoneNumber, password } = req.body;

  try {
    // Check if a user with the provided phone number already exists
    const existingUser = await UsersModel.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }
    bcrypt.hash(password, 2, async (err, hash) => {
      // create a new user
      if (err)
        res
          .status(401)
          .send("Error while hashing the password using bcrypt module.");
      const newUser = new UsersModel({ name, phoneNumber, password });
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, "syook", {
        expiresIn: "1h",
      });

      // Send token to the client
      res.status(201).json({ token });
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});


userRouter.get("/", async (req, res) => {
    try {
      const users = await UsersModel.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ error: error.messsage });
    }
  });
  



module.exports = userRouter;
