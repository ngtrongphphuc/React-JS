const { default: slugify } = require("slugify");
const ProductModel = require("../models/products");
const CategoryModel = require("../models/categories");

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const { name, ...body } = req.body;
      const slug = slugify(name, {
        locale: "vi",
        lower: true,
      });

      const product = await new ProductModel({
        slug,
        name,
        ...body,
      }).save();

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const { search } = req.query;
      const queryObj = {};
      if (search) {
        const nameRegex = new RegExp(search, "i");
        queryObj.name = {
          $regex: nameRegex,
        };
      }

      const products = await ProductModel.find(queryObj)
        .populate("category")
        .exec();

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getProductsHome: async (req, res) => {
    try {
      const categories = await CategoryModel.find().exec();

      const getProductPromise = categories.map(async (it) => {
        const products = await ProductModel.find({ category: it._id }).exec();

        return {
          ...it.toJSON(),
          products,
        };
      });

      const products = await Promise.all(getProductPromise);

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getProductRelated: async (req, res) => {
    try {
      const { id } = req.params;
      const foundProduct = await ProductModel.findById(id).exec();

      if (!foundProduct) {
        return res.status(404).json({
          message: "Product not found!",
        });
      }

      const productsRelated = await ProductModel.find({
        $and: [
          {
            _id: { $ne: foundProduct._id },
          },
          {
            category: foundProduct.category,
          },
        ],
      }).exec();

      res.json(productsRelated);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id)
        .populate("category")
        .exec();

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, ...data } = req.body;
      const { id } = req.params;

      const slug = slugify(name, {
        locale: "vi",
        lower: true,
      });

      const product = await ProductModel.findByIdAndUpdate(
        id,
        { ...data, name, slug },
        { new: true }
      ).exec();

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await ProductModel.findByIdAndDelete(id).exec();

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = ProductController;
