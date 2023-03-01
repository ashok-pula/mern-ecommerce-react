const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controller/productController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = express.Router();
//create product
router.post("/", verifyTokenAndAdmin, createProduct);

//update product
router.put("/:id", verifyTokenAndAdmin, updateProduct);

// //delete product
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

// //get product
router.get("/find/:id", getProduct);

// //get all products
router.get("/", getAllProducts);

module.exports = router;
