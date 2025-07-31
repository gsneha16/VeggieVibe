const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");
const AuthRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const orderHistoryRoute = require("./routes/orderHistory");
const WishlistRoute = require("./routes/wishlist");
const ProfileUpdateRoute = require("./routes/profileupdate");
const placeOrderRoute = require("./routes/placeOrder.js");

dotenv.config();
require("./connection.js");

// App Setup
const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRoute);
app.use("/cart", cartRoute);
app.use("/orderHistory", orderHistoryRoute);
app.use("/wishlist", WishlistRoute);
app.use("/profileUpdate", ProfileUpdateRoute);
app.use("/order", placeOrderRoute);

// Serve React Frontend
app.use(express.static(path.resolve(__dirname, "../client/dist")));
// Serve static folder for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// React Frontend Catch-All Route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// Test Route
app.get("/", (req, res) => {
  res.send("Running....");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
