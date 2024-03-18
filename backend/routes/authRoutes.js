import express from "express";
import AuthController from "../controllers/AuthController";
import { verifyToken } from "../utils/middlewares";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User management and authentication
 */
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User sign up
 *     description: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phoneNumber
 *               - address
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *                 default: John Doe
 *               email:
 *                 type: string
 *                 default: johndoe@mail.com
 *               password:
 *                 type: string
 *                 default: johnDoe20!@
 *               phoneNumber:
 *                 type: string
 *                 default: 1234567890
 *               address:
 *                 type: string
 *                 default: 123 Main St
 *               role:
 *                 type: string
 *                 default: user
 *               isVerified:
 *                type: boolean
 *                default: false
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       400:
 *         description: Invalid request data
 */
authRouter.post("/signup", AuthController.signUp);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and generate access token
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: johndoe@mail.com
 *               password:
 *                 type: string
 *                 default: johnDoe20!@
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/verify:
 *  get:
 *    summary: Verify user email
 *    description: Verify user email using token
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *     - in: query
 *       name: token
 *       required: true
 *       schema:
 *          type: string
 *    responses:
 *      200:
 *         description: User email verified successfully
 *      400:
 *         description: Invalid token
 */

authRouter.get("/verify/:token", AuthController.verifyEmail);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logout user and invalidate access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      content:
 *          application/json:
 *          schema:
 *          type: object
 *          properties:
 *              refreshToken:
 *              type: string
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized access
 */
authRouter.post("/logout", AuthController.logout);

authRouter.post(
  "/resend-verification-email",
  AuthController.resendVerificationEmail
);

authRouter.get("/test", verifyToken, (req, res) => {
  res.status(200).json({ message: "You are authorized" });
});

export default authRouter;
