const express = require("express");
const {
  userUpdate,
  deleteUser,
  getUser,
  getAllUser,
  getUserStats,
} = require("../controller/userController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = express.Router();
//update user
router.put("/:id", verifyTokenAndAuthorization, userUpdate);
//delete user
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//get user
router.get("/find/:id", verifyTokenAndAdmin, getUser);

//get all user
router.get("/", verifyTokenAndAdmin, getAllUser);
//get users stats
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
