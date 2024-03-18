import OwnerDashboardController from "../controllers/OwnerDashboardController";
import { verifyToken, isOwner } from "../utils/middlewares";
import express from "express";

const ownerDashboardRouter = express.Router();

ownerDashboardRouter.get("/", verifyToken, isOwner, (req, res) => {
  res.status(200).json({ message: "Owner dashboard" });
});

ownerDashboardRouter.get(
  "/listings",
  verifyToken,
  isOwner,
  OwnerDashboardController.getCarListings
);

export default ownerDashboardRouter;
