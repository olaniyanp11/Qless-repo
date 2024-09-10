const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const Organization = require("../models/Organization")
// const bcrypt = require('bcrypt');

router.post("/signup", async (req, res, next) => {
  try {
    let { orgName, orgEmail, orgPassword } = req.body;

    // Validate input fields
    if (!orgName || !orgEmail || !orgPassword) {
      return next(createError(400, "All fields are required"));
    }

    if (orgPassword.length < 3) {
      return next(
        createError(400, "Password must be at least 3 characters long")
      );
    }

    // Check if the email is already in use
    const existingOrg= await Organization.findOne({ orgEmail });
    if (existingOrg) {
      return next(createError(409, "Email is already registered"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(orgPassword, 10);

    // Create a new user
    const newUser = new User({
      organizationName: orgName,
      organizationEmail: orgEmail,
      password : orgPassword,
    });
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "organization saved successfully" });
  } catch (err) {
    // Handle errors
    next(err);
  }
});
module.exports = router;
