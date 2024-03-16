import express from "express";
import UserController from "../controllers/UserController";

const authRouter = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User sign up
 *     description: Register a new user
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       400:
 *         description: Invalid request data
 */
authRouter.post("/signup", UserController.signUp);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and generate access token
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", UserController.login);
export default authRouter;
