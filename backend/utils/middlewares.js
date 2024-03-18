import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserSchema";

dotenv.config();

export const verifyToken = (req, res, next) => {
  // console.log("Headers:", req.headers);
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.SECRET || "hsghs6", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.SECRET || "hsghs6",
    {
      expiresIn: "14d",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH, {
    expiresIn: "7d",
  });
};

export const generateVerificationToken = (email) => {
  return jwt.sign({ email }, process.env.VERIFICATION, {
    expiresIn: "1d",
  });
};

export const isOwner = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "owner") {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
