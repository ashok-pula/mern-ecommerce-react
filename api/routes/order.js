const express = require("express");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  monthlyIncome,
} = require("../controller/orderController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = express.Router();
//create Order
router.post("/", verifyToken, createOrder);

//update Order
router.put("/:id", verifyTokenAndAdmin, updateOrder);

// //delete Order
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

// // //get user Order
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);

// //get all Orders
router.get("/", verifyTokenAndAdmin, getAllOrders);

//get monthly income
router.get("/income", verifyTokenAndAdmin, monthlyIncome);

module.exports = router;
