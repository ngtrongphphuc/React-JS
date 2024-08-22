const app = require("express");
const CategoryController = require("../controllers/categories");
const { checkLogin, isAdmin } = require("../middlewares/auth");

const router = app.Router();

router.post("/", checkLogin, isAdmin, CategoryController.createCategory);
router.get("/", CategoryController.getAllCategory);
router.get("/:id", CategoryController.getCategory);
router.put("/:id", checkLogin, isAdmin, CategoryController.updateCategory);
router.delete("/:id", checkLogin, isAdmin, CategoryController.deleteCategory);

module.exports = router;
