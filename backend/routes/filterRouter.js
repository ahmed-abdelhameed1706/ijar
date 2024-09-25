import express from "express";
import FilterController from "../controllers/FilterController.js";

const filterRouter = express.Router();

filterRouter.get("/", FilterController.filterCars);

export default filterRouter;
