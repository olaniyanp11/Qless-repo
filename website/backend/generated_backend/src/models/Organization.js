const mongoose = require("mongoose");
const validator = require("validator");

const orgSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  organizationEmail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  transactions: [
    {
      emails: {
        type: String,
        
        validate: [validator.isEmail, "Invalid email"],
      },
      date: { type: Date },
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
    },
  ],
});

const Organization = mongoose.model("Organization", orgSchema);
module.exports = Organization;
