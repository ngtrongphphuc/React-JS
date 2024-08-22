const app = require("express");
const CartController = require("../controllers/carts");
const { checkLogin } = require("../middlewares/auth");

const router = app.Router();

router.post("/", checkLogin, CartController.addCart);
router.get("/my-carts", checkLogin, CartController.getMyCarts);
router.delete("/:productId", checkLogin, CartController.deleteProduct);
router.put("/", checkLogin, CartController.updateQuantity);

module.exports = router;
