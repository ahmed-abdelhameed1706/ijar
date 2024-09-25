import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserSchema.js";
import { createLogger, transports, format } from "winston";

dotenv.config();

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/activity.log",
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
    }),
  ],
});

export const activityLogger = (req, res, next) => {
  const { method, url, ip, headers } = req;

  const userAgent = headers["user-agent"];

  const token = req.headers.authorization;

  req.user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      req.user = decoded;
    } catch (error) {
      console.error("Error verifying token:", error.message);
    }
  }

  const userInfo = req.user
    ? `Email: ${req.user.email}, UserID: ${req.user.id}`
    : "Guest";

  const logMessage = `${method} ${url} - IP: ${ip}, User: ${userInfo}, User Agent: ${userAgent}`;

  logger.info(logMessage);

  next();
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

export const validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return null;
  }
};

export const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, {
    expiresIn: "14d",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH, {
    expiresIn: "7d",
  });
};

export const generateVerificationToken = (email) => {
  return jwt.sign({ email }, process.env.VERIFICATION, {
    expiresIn: "10m",
  });
};

export const isOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "Owner") {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "Admin") {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
