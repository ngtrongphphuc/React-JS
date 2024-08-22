const { default: slugify } = require("slugify");
const CategoryModel = require("../models/categories");

const CategoryController = {
  createCategory: async (req, res) => {
    try {
      const { name, image } = req.body;
      const slug = slugify(name, {
        locale: "vi",
        lower: true,
      });

      const category = await new CategoryModel({
        name,
        image,
        slug,
      }).save();

      res.json(category);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const categories = await CategoryModel.find().exec();

      res.json(categories);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id).exec();

      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name, image } = req.body;
      const { id } = req.params;

      const slug = slugify(name, {
        locale: "vi",
        lower: true,
      });

      const category = await CategoryModel.findByIdAndUpdate(
        id,
        { name, image, slug },
        { new: true }
      ).exec();

      res.json(category);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findByIdAndDelete(id).exec();

      res.json(category);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = CategoryController;
