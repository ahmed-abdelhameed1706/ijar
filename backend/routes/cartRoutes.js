import express from "express";
import { verifyToken } from "../utils/middlewares";
import CartController from "../controllers/CartController";

const cartRouter = express.Router();

cartRouter.post("/cart", verifyToken, CartController.addToCart);

cartRouter.get("/cart", verifyToken, CartController.getCart);

cartRouter.get("/carts", verifyToken, CartController.getCartsByUserId);

cartRouter.delete("/cart/:id", verifyToken, CartController.deleteFromCart);

cartRouter.post("/checkout", verifyToken, CartController.checkout);

export default cartRouter;
