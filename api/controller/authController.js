const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json("user already registered");
    const hashPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PAS_SEC
    ).toString();
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("user is not found");

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PAS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (req.body.password !== originalPassword)
      return res.status(401).json("password is not matching");
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { userRegister, userLogin };
