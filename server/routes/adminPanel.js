const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, contact, adminPin } = req.body;
    const existingUser = await userModel.findOne({ email });
    const errMsg = "Auth failed! Email or password is wrong";

    if (!existingUser) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const isPinValid = bcrypt.compare(adminPin, existingUser.adminPin);
    if (!isPinValid) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { username: existingUser.username, _id: existingUser._id },
      process.env.JWT_SECRET
      // { expiredIn: "24h" }
    );

    res.status(201).json({
      message: "login Successful",
      success: true,
      jwtToken,
      name: existingUser.username,
    });
  } catch (err) {
    console.error("login Error:", err); // Log the error
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

module.exports = login;
