const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/product.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/order.js");
const stripeRoutes = require("./routes/stripe.js");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongo DB is connected"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", stripeRoutes);

app.listen(5000, () => console.log("server is running"));
