import express from "express";
import TicketController from "../controllers/TicketController";

import { isAdmin, verifyToken } from "../utils/middlewares";

const ticketRouter = express.Router();

ticketRouter.post("/tickets", verifyToken, TicketController.createTicket);

ticketRouter.get(
  "/tickets",
  verifyToken,
  isAdmin,
  TicketController.getAllTickets
);

ticketRouter.get("/tickets/:id", verifyToken, TicketController.getTicket);

ticketRouter.put("/tickets/:id", verifyToken, TicketController.updateTicket);

ticketRouter.delete("/tickets/:id", verifyToken, TicketController.deleteTicket);

ticketRouter.get("/my-tickets", verifyToken, TicketController.getMyTickets);

export default ticketRouter;
