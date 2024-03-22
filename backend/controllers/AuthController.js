import User from "../models/UserSchema";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  validateToken,
} from "../utils/middlewares";

import { verifyEmailForm } from "../utils/mailFormer";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

import { sendEmail } from "../utils/utility";

import path from "path";

// dotenv.config();

let lastEmailSentTimestamp = 0;

export default class AuthController {
  static checkAuthentication = async (req, res) => {
    const token = req.cookies?.jwt;
    console.log("Cookies: ", token);
    const user = validateToken(token);
    return {
      user: user,
      jwt: token,
    };
  };

  static signUp = async (req, res) => {
    try {
      const {
        fullName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        address,
        role,
      } = req.body;

      if (
        !fullName ||
        !email ||
        !password ||
        !confirmPassword ||
        !phoneNumber ||
        !address ||
        !role
      ) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });
      if (existingUser) {
        return res.status(400).json({
          message: "This email address is already registered.",
          message1: "Please sign in instead.",
        });
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

      await newUser.save();

      const htmlContent = verifyEmailForm(fullName, verificationToken);
      sendEmail(email, "Account Verification", htmlContent);

      // res.status(201).json({
      //   userId: newUser.id,
      //   fullName: newUser.fullName,
      //   email: newUser.email,
      //   role: newUser.role,
      //   address: newUser.address,
      // });
      res
        .status(201)
        .json({ message: "Your account has been successfully created." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.cookies);

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (!user.isVerified) {
        return res.status(401).json({ message: "Email not verified" });
      }

      const accessToken = generateAccessToken(user);

      const refreshToken = generateRefreshToken(user);

      res.cookie("jwt", accessToken, {
        httpOnly: true, // The cookie cannot be accessed by client-side scripts
        secure: true, // The cookie will only be sent over HTTPS
        sameSite: "none", // The cookie will be sent on requests from other websites
        maxAge: 7 * 24 * 60 * 60 * 1000, // The cookie will expire after 7 days
      });

      res.status(200).json({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        address: user.address,
        phoneNumber: user.phoneNumber,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  static logout = async (req, res) => {
    res.clearCookie("jwt", {
      httpOnly: true, // The cookie cannot be accessed by client-side scripts
      secure: true, // The cookie will only be sent over HTTPS
      sameSite: "none", // The cookie will be sent on requests from other websites
    });
    res.status(200).json({ message: "Logged out" });
  };

  static verifyEmail = async (req, res) => {
    const file = path.join(__dirname, "../templates/expireToken.html");
    try {
      const { token } = req.params;

      const decoded = jwt.verify(token, process.env.VERIFICATION);

      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        console.log({ message: "User not found" });
        return res.status(404).sendFile(file);
      }

      if (user.isVerified) {
        console.log({ message: "User is already verified" });
        return res.status(404).sendFile(file);
      }

      user.isVerified = true;
      await user.save();

      res.status(200).send("Email verification successful. You can now login.");
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(404).sendFile(file);
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

      const htmlContent = verifyEmailForm(user.fullName, verificationToken);
      sendEmail(email, "Account Verification", htmlContent);

      lastEmailSentTimestamp = Date.now();

      res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}
