const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllProducts = async (req, res) => {
  const query = req.query.new;
  const cquery = req.query.category;
  try {
    let products;
    if (query) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (cquery) {
      products = await Product.find({ categories: { $in: [cquery] } });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
