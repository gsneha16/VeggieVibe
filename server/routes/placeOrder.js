const userModel = require("../models/user");
const router = require("express").Router();
const ensureAuthenticated = require("../middlewares/auth")

// place Order
router.post("/", ensureAuthenticated,async (req, res) => {
  const username = req.user.username;

  try {
    const user = await userModel.findOne({ username: username });

    const orderData = user.myCart.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalAmount: parseInt(item.price) * parseInt(item.quantity),
      };
    });

    // Clone existing orders
    let updatedOrders = [...user.orders];

    orderData.forEach((newItem) => {
      const existingOrder = updatedOrders.find(
        (order) => order.name === newItem.name
      );

      if (existingOrder) {
        existingOrder.quantity = newItem.quantity;
        existingOrder.totalAmount = newItem.totalAmount;
      } else {
        updatedOrders.push(newItem);
      }
    });

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { orders: updatedOrders } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Orders updated successfully",
      data: updatedUser.orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error!",
    });
  }
});

router.get("/:user", async (req, res) => {
  const username = req.params.user;
  try {
    const user = await userModel.findOne({ username: username });
    const order = user.orders;
    res.status(200).json({
      status: "success",
      orders: order,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
