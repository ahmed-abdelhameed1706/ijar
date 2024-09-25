import express from "express";
import { verifyToken } from "../utils/middlewares.js";
import CarController from "../controllers/CarController.js";

const carRouter = express.Router();

carRouter.post("/cars", verifyToken, CarController.postCar);

carRouter.get("/cars", CarController.getCars);

carRouter.get("/cars/:id", CarController.getCar);

carRouter.put("/cars/:id", verifyToken, CarController.updateCar);

carRouter.delete("/cars/:id", verifyToken, CarController.deleteCar);

carRouter.post("/add-to-cart", verifyToken, CarController.addCarToCart);

export default carRouter;
