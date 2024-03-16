import express from "express";
import { verifyToken } from "../utils/middlewares";
import CartController from "../controllers/CartController";

const cartRouter = express.Router();

/**
 * @swagger
 * /cart:
 *   POST:
 *     summary: Add to Cart
 *     description: Add Car to Cart
 *     security:
 *       - bearerAuth: []
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
 * /cart:
 *   GET:
 *     summary: View Cart
 *     description: View Cart
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
 * /cart/:id:
 *   DELETE:
 *     summary: Delete car from cart
 *     description: Delete car from cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Car deleted from cart successfully
 *       401:
 *         description: Unauthorized access
 */
cartRouter.delete("/cart/:id", verifyToken, CartController.deleteFromCart);

/**
 * @swagger
 * /checkout:
 *   POST:
 *     summary: Checkout
 *     description: Checkout
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
