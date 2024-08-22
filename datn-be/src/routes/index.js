const express = require("express");

const authRouter = require("./auth");
const categoryRouter = require("./categories");
const productRouter = require("./products");
const orderRouter = require("./orders");
const cartRouter = require("./carts");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/carts", cartRouter);

module.exports = router;
