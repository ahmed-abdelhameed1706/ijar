import express from "express";
import { verifyToken } from "../utils/middlewares";
import CommentController from "../controllers/CommentController";

const commentRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: Comment management
 */
/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment entry
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - carId
 *              - content
 *              - rate
 *            properties:
 *             userId:
 *              type: string
 *              default: 60f3a0b2d3e4d4b5d4e9e4b5
 *             carId:
 *              type: string
 *              default: 60f3a0b2d3e4d4b5d4e9e4b5
 *             content:
 *              type: string
 *              default: This is a comment
 *             rate:
 *              type: number
 *              default: 5
 *     responses:
 *       200:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized access
 *       400:
 *         description: Invalid request data
 */
commentRouter.post("/comments", verifyToken, CommentController.postComment);

/**
 * @swagger
 * /api/comments/{carId}:
 *   get:
 *     summary: Get a comments by its carID
 *     description: Retrieve a comments by its carID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description:  carID of the car to retrieve a comments
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Car not found
 */
commentRouter.get("/comments/:carId", CommentController.getComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete a comment by its ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: comment deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: comment not found
 */
commentRouter.delete(
  "/comments/:id",
  verifyToken,
  CommentController.deleteComment
);

export default commentRouter;
