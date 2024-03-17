import express from "express";
import { verifyToken } from "../utils/middlewares";
import CarController from "../controllers/CarController";

const carRouter = express.Router();
/**
 * @swagger
 * tags:
 *  name: Cars
 *  description: Car management
 */
/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car entry
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - brandName
 *              - model
 *              - year
 *              - type
 *              - color
 *              - price
 *              - licensePlateNumber
 *              - ownerId
 *              - engineId
 *             properties:
 *               brandName:
 *                 type: string
 *                 default: Toyota
 *               model:
 *                 type: string
 *                 default: Corolla
 *               year:
 *                 type: string
 *                 default: 2020
 *               type:
 *                 type: string
 *                 default: Sedan
 *               color:
 *                 type: string
 *                 default: Black
 *               price:
 *                 type: number
 *                 default: 100
 *               licensePlateNumber:
 *                 type: string
 *                 default: 123456
 *               available:
 *                 type: boolean
 *                 default: true
 *               images:
 *                 type: array
 *                 items:
 *                  type: string
 *                 default: []
 *               ownerId:
 *                 type: string
 *                 default: ""
 *               engineId:
 *                 type: string
 *                 default: ""
 *               averageRate:
 *                 type: number
 *                 default: 0
 *               comments:
 *                 type: array
 *                 items:
 *                  type: string
 *                 default: []
 *               description:
 *                 type: string
 *                 default: ""
 *     responses:
 *       200:
 *         description: Car created successfully
 *       401:
 *         description: Unauthorized access
 *       400:
 *         description: Invalid request data
 */
carRouter.post("/cars", verifyToken, CarController.postCar);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     description: Retrieve all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Cars retrieved successfully
 *       400:
 *         description: Invalid request data
 */
carRouter.get("/cars", CarController.getCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     description: Retrieve a car by its ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *         description: ID of the car to retrieve
 *     responses:
 *       200:
 *         description: Car retrieved successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Car not found
 */
carRouter.get("/cars/:id", CarController.getCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     description: Update a car by its ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the car to update
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - brandName
 *              - model
 *              - year
 *              - type
 *              - color
 *              - price
 *              - licensePlateNumber
 *              - ownerId
 *              - engineId
 *             properties:
 *               brandName:
 *                 type: string
 *                 default: Toyota
 *               model:
 *                 type: string
 *                 default: Corolla
 *               year:
 *                 type: string
 *                 default: 2020
 *               type:
 *                 type: string
 *                 default: Sedan
 *               color:
 *                 type: string
 *                 default: Black
 *               price:
 *                 type: number
 *                 default: 100
 *               licensePlateNumber:
 *                 type: string
 *                 default: 123456
 *               available:
 *                 type: boolean
 *                 default: true
 *               images:
 *                 type: array
 *                 items:
 *                  type: string
 *                 default: []
 *               ownerId:
 *                 type: string
 *                 default: ""
 *               engineId:
 *                 type: string
 *                 default: ""
 *               averageRate:
 *                 type: number
 *                 default: 0
 *               comments:
 *                 type: array
 *                 items:
 *                  type: string
 *                 default: []
 *               description:
 *                 type: string
 *                 default: ""
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
carRouter.put("/cars/:id", verifyToken, CarController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     description: Delete a car by its ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the car to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not found
 */
carRouter.delete("/cars/:id", verifyToken, CarController.deleteCar);

export default carRouter;
