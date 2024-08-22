const app = require("express");
const AuthController = require("../controllers/auth");

const router = app.Router();

router.post("/sign-up", AuthController.signUp);
router.post("/sign-in", AuthController.signIn);

module.exports = router;
