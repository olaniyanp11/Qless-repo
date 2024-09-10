const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt")
const  User = require('../models/User')
// const bcrypt = require('bcrypt');

router.post("/signup", async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return next(createError(400, "All fields are required"));
    }

    if (password.length < 3) {
      return next(
        createError(400, "Password must be at least 3 characters long")
      );
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email is already registered"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "user saved successfully" });
  } catch (err) {
    // Handle errors
    next(err);
  }
});
module.exports = router;
