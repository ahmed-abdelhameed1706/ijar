import express from "express";
import UserController from "../controllers/UserController";
import { verifyToken } from "../utils/middlewares";

const userRouter = express.Router();
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/users", verifyToken, UserController.getUser);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a user
 *     description: Update a user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      description: User data
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 default: John Doe
 *               email:
 *                 type: string
 *                 default: johndoe@mail.com
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
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error

 */
userRouter.put("/users", verifyToken, UserController.updateUser);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
userRouter.delete("/users", verifyToken, UserController.deleteUser);

/**
 * @swagger
 * /api/users/reset_password:
 *   post:
 *     summary: Send reset password email
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: user@example.com
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */
userRouter.post("/users/reset_password", UserController.forgotPassword);

/**
 * @swagger
 * /api/users/reset_password/{token}:
 *   get:
 *     summary: Get reset password form
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: abcdef123456
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/users/reset_password/:token", UserController.getResetForm);

/**
 * @swagger
 * /api/users/reset_password:
 *   put:
 *     summary: Reset user password
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User email and new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: newPassword123
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */
userRouter.put("/users/reset_password", UserController.resetPassword);

export default userRouter;
