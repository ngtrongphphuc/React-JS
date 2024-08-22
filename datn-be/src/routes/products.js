const app = require("express");
const ProductController = require("../controllers/products");
const { checkLogin, isAdmin } = require("../middlewares/auth");

const router = app.Router();

router.post("/", checkLogin, isAdmin, ProductController.createProduct);
router.get("/home", ProductController.getProductsHome);
router.get("/", ProductController.getAllProduct);
router.get("/:id/related", ProductController.getProductRelated);
router.get("/:id", ProductController.getProduct);
router.put("/:id", checkLogin, isAdmin, ProductController.updateProduct);
router.delete("/:id", checkLogin, isAdmin, ProductController.deleteProduct);

module.exports = router;
