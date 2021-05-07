const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  psuedo: {
    type: String,
    unique: [true, "this psuedo is aleady taken"],
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
  },
  password: {
    type: String,
    minLength: [6, "password must be at 6 carachter long"],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.signJwtToken = function () {
  console.log("ran");
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10 days",
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
