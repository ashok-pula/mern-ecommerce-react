const express = require("express");
const { userRegister, userLogin } = require("../controller/authController");

const router = express.Router();
//register
router.post("/register", userRegister);

//login
router.post("/login", userLogin);

module.exports = router;
