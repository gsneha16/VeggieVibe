const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: String,
  contact: String,
  AdminPin: "Secret",
});
