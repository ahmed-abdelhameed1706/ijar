import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/signup", UserController.signUp);

export default router;
