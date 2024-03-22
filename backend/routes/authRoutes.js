import express from "express";
import AuthController from "../controllers/AuthController";
import { verifyToken } from "../utils/middlewares";

const authRouter = express.Router();

authRouter.post("/signup", AuthController.signUp);

authRouter.post("/login", AuthController.login);

authRouter.get("/verify/:token", AuthController.verifyEmail);

authRouter.post("/logout", AuthController.logout);

authRouter.post(
  "/resend-verification-email",
  AuthController.resendVerificationEmail
);

authRouter.get("/test", verifyToken, (req, res) => {
  res.status(200).json({ message: "You are authorized" });
});

authRouter.get("/check", AuthController.checkAuthentication);

export default authRouter;
