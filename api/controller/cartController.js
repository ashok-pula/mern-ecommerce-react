const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  try {
    // console.log(req.body);
    const newCart = new Cart(req.body);
    // console.log(newCart);
    const savedCart = await newCart.save();
    // console.log(savedCart);

    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
};
