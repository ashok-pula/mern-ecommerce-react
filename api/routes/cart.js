const express = require("express");
const {
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
  createCart,
} = require("../controller/cartController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = express.Router();
//create cart
router.post("/", verifyToken, createCart);

//update cart
router.put("/:id", verifyTokenAndAuthorization, updateCart);

// //delete Cart
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

// // //get user Cart
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);

// //get all Carts
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
