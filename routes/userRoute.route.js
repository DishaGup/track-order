const express = require("express");
const UsersModel = require("../models/Users.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); //for hashing of password

/// User login route
userRouter.post("/users/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await UsersModel.findOne({ name });
    //  console.log(user)

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, "syook", {
            expiresIn: "1h",
          });

          res.status(200).json({ token, userId: user._id }); // Use user._id instead of newUser._id
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

userRouter.post("/users/register", async (req, res) => {
  const { name, phoneNumber, password } = req.body;

  try {
    // Check if a user with the provided phone number already exists
    const existingUser = await UsersModel.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }
    bcrypt.hash(password, 2, async (err, hash) => {
      if (err) {
        return res
          .status(500)
          .send("Error while hashing the password using bcrypt module.");
      }

      try {
        // Create a new user with the hashed password
        const newUser = new UsersModel({ name, phoneNumber, password: hash });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, "syook", {
          expiresIn: "1h",
        });

        // Send token to the client
        res.status(201).json({ token, userId: newUser._id });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

userRouter.get("/users", async (req, res) => {
  try {
    const users = await UsersModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});

module.exports = userRouter;
