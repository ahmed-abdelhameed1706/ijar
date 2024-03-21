import express from "express";
import { verifyToken } from "../utils/middlewares";
import CarController from "../controllers/CarController";

const carRouter = express.Router();

carRouter.post("/cars", verifyToken, CarController.postCar);

carRouter.get("/cars", CarController.getCars);

carRouter.get("/cars/:id", CarController.getCar);

carRouter.put("/cars/:id", verifyToken, CarController.updateCar);

carRouter.delete("/cars/:id", verifyToken, CarController.deleteCar);

export default carRouter;
