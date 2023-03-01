const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    // console.log(req.body);
    const newOrder = new Order(req.body);
    // console.log(newOrder);
    const savedOrder = await newOrder.save();
    // console.log(savedOrder);

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOrder = async (req, res) => {
  try {
    // console.log(req.params.userId);
    const order = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const monthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  monthlyIncome,
};
