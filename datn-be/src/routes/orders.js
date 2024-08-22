const app = require("express");
const OrderController = require("../controllers/orders");
const { checkLogin, isAdmin } = require("../middlewares/auth");

const router = app.Router();

router.post("/", checkLogin, OrderController.createOrder);
router.get("/", checkLogin, isAdmin, OrderController.getAllOrder);
router.get("/:id", checkLogin, isAdmin, OrderController.getOrder);
router.put("/:id", checkLogin, isAdmin, OrderController.updateStatus);

module.exports = router;
