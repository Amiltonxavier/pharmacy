const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 4,
    },
    email: {
      type: String,
      requerid: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      min: 9,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
      min: 9,
    },
    role: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
