import User from "../models/UserSchema";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateVerificationToken,
} from "../utils/middlewares";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

import nodemailer from "nodemailer";

dotenv.config();

let lastEmailSentTimestamp = 0;

export default class AuthController {
  static signUp = async (req, res) => {
    try {
      const { fullName, email, password, phoneNumber, address, role } =
        req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const verificationToken = generateVerificationToken(email);

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role,
        verificationToken,
      });
      console.log(newUser);

      await newUser.save();

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
        subject: "Account Verification",
        html: `<p>Click <a href="http://localhost:5000/auth/verify/${verificationToken}">here</a> to verify your account.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(201).json({
        userId: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        address: newUser.address,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: "Email not verified" });
      }

      const accessToken = generateAccessToken(user);

      res.status(200).json({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        accessToken,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  static verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;

      const decoded = jwt.verify(token, process.env.VERIFICATION);

      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: "User is already verified" });
      }

      user.isVerified = true;
      await user.save();

      res.status(200).send("Email verification successful. You can now login.");
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({ message: "Token has expired" });
      }
      res.status(400).json({ message: "Invalid token" });
    }
  };

  static resendVerificationEmail = async (req, res) => {
    try {
      const { email } = req.body;

      if (Date.now() - lastEmailSentTimestamp < 30000) {
        return res.status(429).json({
          message: "Please wait for 30 seconds before sending another email",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: "User is already verified" });
      }

      const verificationToken = generateVerificationToken(email);

      user.verificationToken = verificationToken;

      await user.save();

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
        subject: "Account Verification",
        html: `<p>Click <a href="http://localhost:5000/auth/verify/${verificationToken}">here</a> to verify your account.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      lastEmailSentTimestamp = Date.now();

      res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}
