import express from "express";
import { verifyToken } from "../utils/middlewares";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);

router.get("/test", verifyToken, (req, res) => {
  res.send("Hello World");
});

export default router;
