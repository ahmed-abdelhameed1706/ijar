import User from "../models/UserSchema";
import Cart from "../models/CartSchema";
import Car from "../models/CarSchema";
import { resetPasswordForm } from "../utils/mailFormer";
import { sendEmail } from "../utils/utility";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

const path = require("path");

dotenv.config();

export default class UserController {
  static async getUser(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "Not Found" });
      }

      const { _id, password, ...rest } = user._doc;
      return res.json({ id: _id, ...rest });
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = req.body.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "Not Found" });
      }

      const newUser = await User.findByIdAndUpdate(user.id, req.body, {
        returnOriginal: false,
      });
      const { _id, password, ...rest } = newUser._doc;
      return res.json({
        id: _id,
        ...rest,
        accessToken: req.headers["authorization"],
      });
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static updatePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "Not Found" });
      }

      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message:
            "The current password you entered is incorrect. Please try again.",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      user.password = String(hashedPassword);
      await user.save();
      return res.json({ message: "Password updated successfully." });
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  };

  static async deleteUser(req, res) {
    try {
      const { password } = req.body;
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "Not Found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "The password you entered is incorrect. Please try again.",
        });
      }

      await Cart.deleteMany({ userId: user.id });

      await Car.deleteMany({ ownerId: user.id });

      await User.findByIdAndDelete(user.id);
      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "Not Found" });
      }

      const token = jwt.sign({ id: user._id }, process.env.RESET_TOKEN, {
        expiresIn: "2h",
      });

      user.resetToken = token;
      await user.save();

      const message = resetPasswordForm(user.fullName, token);

      sendEmail(email, "Reset Your Password for Ijar", message);

      return res.status(200).json({
        message: "Check your email for instructions on resetting your password",
      });
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async getResetForm(req, res) {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.RESET_TOKEN);

      const user = await User.findOne({ _id: decoded.id, resetToken: token });
      if (!user) {
        const file = path.join(__dirname, "../templates/expireToken.html");
        return res.status(404).sendFile(file);
      }

      const file = path.join(__dirname, "../templates/resetPassword.html");

      res.sendFile(file);
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, password, confPassword } = req.body;

      const decoded = jwt.verify(token, process.env.RESET_TOKEN);

      const user = await User.findOne({ _id: decoded.id, resetToken: token });
      if (!user) {
        const file = path.join(__dirname, "../templates/expireToken.html");

        return res.status(404).sendFile(file);
      }

      if (!password || password.length < 8) {
        user.resetToken = "";
        await user.save();
        return res.status(400).json({
          message:
            "<h3 id='error'>Password must be 8 to 24 characters. Must include uppercase and lowercase letters and a number.</h3>",
        });
      }

      if (!confPassword || password !== confPassword) {
        user.resetToken = "";
        await user.save();
        return res.status(400).json({
          message:
            "<h3 id='error'>Confirme password must match the first password.</h3>",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.resetToken = "";
      await user.save();

      res.status(200).json({
        message: "<h3>Password updated successfully. Please login again.<h3>",
      });
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }
}
