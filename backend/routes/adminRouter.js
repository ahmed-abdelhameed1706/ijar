import express from "express";
import AdminController from "../controllers/AdminController";
import { isAdmin } from "../utils/middlewares";

const adminRouter = express.Router();

// USERS MANAGEMENT
adminRouter.get("/users", isAdmin, AdminController.getAllUsers);
adminRouter.delete("/users/:id", isAdmin, AdminController.deleteUser);

// CARS MANAGEMENT
adminRouter.get("/cars", isAdmin, AdminController.getAllCars);
adminRouter.delete("/cars/:id", isAdmin, AdminController.deleteCar);

// TICKETS MANAGEMENT
adminRouter.get("/tickets", isAdmin, AdminController.getAllTickets);
adminRouter.delete("/tickets/:id", isAdmin, AdminController.deleteTicket);

// Cart MANAGEMENT
adminRouter.get("/carts", isAdmin, AdminController.getAllCarts);
adminRouter.delete("/carts/:id", isAdmin, AdminController.deleteCart);

export default adminRouter;
