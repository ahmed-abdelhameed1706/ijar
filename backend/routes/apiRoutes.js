import express from 'express';
import { verifyToken } from '../utils/middlewares';
import CarController from '../controllers/CarController';
import CommentController from '../controllers/CommentController';

const apiRouter = express.Router();

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car entry
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Car created successfully
 *       401:
 *         description: Unauthorized access
 *       400:
 *         description: Invalid request data
 */
apiRouter.post('/cars', verifyToken, CarController.postCar);

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     description: Retrieve all cars
 *     responses:
 *       200:
 *         description: Cars retrieved successfully
 *       400:
 *         description: Invalid request data
 */
apiRouter.get('/cars', CarController.getCars);

/**
 * @swagger
 * /cars/{carId}:
 *   get:
 *     summary: Get a car by ID
 *     description: Retrieve a car by its ID
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the car to retrieve
 *     responses:
 *       200:
 *         description: Car retrieved successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Car not found
 */
apiRouter.get('/cars/:id', CarController.getCar);

/**
 * @swagger
 * /cars/{carId}:
 *   put:
 *     summary: Update a car by ID
 *     description: Update a car by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the car to update
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       401:
 *         description: Unauthorized access
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Car not found
 */
apiRouter.put('/cars/:id', verifyToken, CarController.updateCar);

/**
 * @swagger
 * /cars/{carId}:
 *   delete:
 *     summary: Delete a car by ID
 *     description: Delete a car by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the car to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not found
 */
apiRouter.delete('/cars/:id', verifyToken, CarController.deleteCar);

apiRouter.post('/comments', verifyToken, CommentController.postComment);

apiRouter.get('/comments/:carId', CommentController.getComments);

apiRouter.delete('/comments/:id', verifyToken, CommentController.deleteComment);

export default apiRouter;
