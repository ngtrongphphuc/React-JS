const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  signUp: async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
      const emailOrPhoneExists = await UserModel.findOne({
        $or: [{ email }, { phone }],
      }).exec();

      if (emailOrPhoneExists) {
        return res.status(400).json({
          message: "Email or phone exists",
        });
      }

      const userCount = await UserModel.countDocuments();
      const role = userCount > 0 ? "USER" : "ADMIN";

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await new UserModel({
        name,
        email,
        phone,
        password: hashedPassword,
        role,
      }).save();

      res.json({
        status: true,
        message: "Register successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      // check email registered
      const findUser = await UserModel.findOne({ email }).exec();

      if (!findUser) {
        return res.status(404).json({ message: "Bạn đã nhập sai tài khoản hoặc mật khẩu!" });
      }

      // check password
      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Wrong password!" });
      }

      const token = jwt.sign(
        {
          id: findUser._id,
          email: findUser.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      res.json({
        user: findUser,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = AuthController;
