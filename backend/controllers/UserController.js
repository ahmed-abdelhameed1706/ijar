import User from "../models/UserSchema";
import Cart from "../models/CartSchema";
import Car from "../models/CarSchema";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

export default class UserController {
  static async getUser(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "Not found" });
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

  static async updateUser(req, res) {
    try {
      const data = Object.keys(req.body);

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "Not found" });
      }

      if (data.includes("password")) {
        return res.status(403).json({
          error: "Forbidden",
          message: "You cannot update your password.",
        });
      }

      const newUser = await User.findByIdAndUpdate(user.id, req.body, {
        returnOriginal: false,
      });
      const { _id, password, ...rest } = newUser._doc;
      return res.json({ id: _id, ...rest });
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "Not found" });
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
        return res.status(404).json({ error: "Not found" });
      }

      const token = jwt.sign({ id: user._id }, process.env.RESET_TOKEN, {
        expiresIn: "2h",
      });

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.APP_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<h4>Click the following link to reset your password: <a href="http://localhost:5000/api/users/reset_password/${token}">Reset Password</a></h4>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error sending email");
        } else {
          console.log(`Email sent: ${info.response}`);
          res.status(200).json({
            message:
              "Check your email for instructions on resetting your password",
          });
        }
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

      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(404).send("<h3>Invalid or expired token</h3>");
      }
      const path = require("path");

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
      const { token, password } = req.body;

      const decoded = jwt.verify(token, process.env.RESET_TOKEN);

      const user = await User.findById(decoded.id);
      console.log(user);
      if (!user) {
        res.status(404).send("<h3>Invalid or expired token<h3>");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.save();

      res.status(200).send("<h3>Password updated successfully<h3>");
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }
}
