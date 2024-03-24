import express from "express";
import AuthController from "../controllers/AuthController";
import { verifyToken } from "../utils/middlewares";

const authRouter = express.Router();

authRouter.post("/signup", AuthController.signUp);

authRouter.post("/login", AuthController.login);

authRouter.get("/verify/:token", AuthController.verifyEmail);

authRouter.post(
  "/resend-verification-email",
  AuthController.resendVerificationEmail
);

authRouter.get("/test", verifyToken, (req, res) => {
  res.status(200).json({ message: "You are authorized" });
});

export default authRouter;
