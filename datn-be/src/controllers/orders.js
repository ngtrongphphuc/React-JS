const ProductModel = require("../models/products");
const CartModel = require("../models/carts");
const { STATUS_ORDER, OrderModel } = require("../models/orders");

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const orderBy = req.user.id;

      const { customerName, customerPhone, customerEmail, address, message } =
        req.body;

      const cart = await CartModel.findOne({ user: orderBy }).exec();

      const productsOrder = [];
      for await (item of cart.products) {
        const product = await ProductModel.findById(item.product).exec();

        productsOrder.push({
          quantity: item.quantity,
          product,
        });
      }

      const totalPrice = productsOrder.reduce((total, item) => {
        const totalPrice = item.quantity * item.product.price;

        total += totalPrice;

        return total;
      }, 0);

      const order = await new OrderModel({
        customerName,
        customerEmail,
        customerPhone,
        address,
        message,
        orderBy,
        totalPrice,
        products: productsOrder,
      }).save();

      // remove cart
      await CartModel.deleteOne({ user: orderBy });

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const orders = await OrderModel.find().sort({ createdAt: -1 }).exec();

      res.json(orders);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  getOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id).exec();

      if (!order) {
        return res.status(500).json({ message: "Order not found!" });
      }

      res.json(order);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!STATUS_ORDER.includes(status)) {
        return res.status(400).json({ message: "Status is not valid" });
      }

      const order = await OrderModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).exec();

      res.json(order);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};

module.exports = OrderController;
