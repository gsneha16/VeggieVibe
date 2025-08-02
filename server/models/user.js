const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  totalAmount: Number,
});

const orderHistorySchema = new mongoose.Schema({
  username: String,
  email: String,
  orders: Array,
  address: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const WishlistSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
  contact: { type: String, require: true },
  profileImg: {
    data: Buffer,
    contentType: String,
  },
  createdAt: { type: Date, default: Date.now },
  myCart: [cartSchema], // List of added veggies
  wishlist: [WishlistSchema], // List of favorite veggies
  orders: [orderSchema], // List of ordered veggies
  ordersHistory: [orderHistorySchema]
});

module.exports = mongoose.model("User", UserSchema);
