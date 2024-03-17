import express from "express";
import { verifyToken } from "../utils/middlewares";
import CartController from "../controllers/CartController";

const cartRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: Cart management
 */
/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add to Cart
 *     description: Add Car to Cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *              - carId
 *              - userId
 *              - endDate
 *              - totalCost
 *          properties:
 *             carId:
 *              type: string
 *              default: 60f3a0b2d3e4d4b5d4e9e4b5
 *             userId:
 *              type: string
 *              default: 60f3a0b2d3e4d4b5d4e9e4b5
 *             startDate:
 *              type: date
 *              default: 2021-07-01
 *             endDate:
 *              type: date
 *              default: 2021-08-01
 *             rentalTerm:
 *              type: number
 *              default: 1
 *             totalCost:
 *              type: number
 *              default: 100
 *     responses:
 *       200:
 *         description: Car added to cart successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not available
 */
cartRouter.post("/cart", verifyToken, CartController.addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: View Cart
 *     description: View Cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Return All Cars
 *       401:
 *         description: Unauthorized access
 */
cartRouter.get("/cart", verifyToken, CartController.getCart);

/**
 * @swagger
 * /api/cart/:id:
 *   delete:
 *     summary: Delete car from cart
 *     description: Delete car from cart
 *     tags: [Cart]
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
 *         description: Car deleted from cart successfully
 *       401:
 *         description: Unauthorized access
 */
cartRouter.delete("/cart/:id", verifyToken, CartController.deleteFromCart);

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Checkout
 *     description: Checkout
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checked out successfully
 *       401:
 *         description: Unauthorized access
 */
cartRouter.post("/checkout", verifyToken, CartController.checkout);

export default cartRouter;
