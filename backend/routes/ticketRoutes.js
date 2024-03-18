import express from "express";
import TicketController from "../controllers/TicketController";

import { isAdmin, verifyToken } from "../utils/middlewares";

const ticketRouter = express.Router();

ticketRouter.post("/create-ticket", verifyToken, TicketController.createTicket);
ticketRouter.get(
  "/tickets",
  verifyToken,
  isAdmin,
  TicketController.getAllTickets
);
ticketRouter.get("/ticket/:id", verifyToken, TicketController.getTicket);
ticketRouter.put("/ticket/:id", verifyToken, TicketController.updateTicket);
ticketRouter.delete("/ticket/:id", verifyToken, TicketController.deleteTicket);
ticketRouter.get("/my-tickets", verifyToken, TicketController.getMyTickets);

export default ticketRouter;
