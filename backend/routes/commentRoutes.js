import express from 'express';
import { verifyToken } from '../utils/middlewares';
import CommentController from '../controllers/CommentController';

const commentRouter = express.Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment entry
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized access
 *       400:
 *         description: Invalid request data
 */
commentRouter.post('/comments', verifyToken, CommentController.postComment);

/**
 * @swagger
 * /comments/{carId}:
 *   get:
 *     summary: Get a comments by its carID
 *     description: Retrieve a comments by its carID
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
commentRouter.get('/comments/:carId', CommentController.getComments);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete a comment by its ID
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
  '/comments/:id',
  verifyToken,
  CommentController.deleteComment,
);

export default commentRouter;
