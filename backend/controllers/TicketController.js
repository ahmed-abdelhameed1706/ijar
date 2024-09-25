import Ticket from "../models/TicketSchema.js";

export default class TicketController {
  static async createTicket(req, res) {
    try {
      const { title, description, priority } = req.body;
      const createdBy = req.userId;
      const ticket = new Ticket({
        title,
        description,
        priority,
        createdBy,
      });
      await ticket.save();
      return res.status(201).json(ticket);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  static async getAllTickets(req, res) {
    try {
      const tickets = await Ticket.find();
      return res.status(200).json(tickets);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  static async getTicket(req, res) {
    try {
      const ticketId = req.params.id;
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      if (req.userId !== ticket.createdBy.toString() && req.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      return res.status(200).json(ticket);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  static async updateTicket(req, res) {
    try {
      const ticketId = req.params.id;
      const { title, description, status, priority } = req.body;
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      if (req.userId !== ticket.createdBy.toString() && req.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      ticket.title = title || ticket.title;
      ticket.description = description || ticket.description;
      ticket.status = status || ticket.status;
      ticket.priority = priority || ticket.priority;
      ticket.updatedAt = Date.now();
      await ticket.save();
      return res.status(200).json(ticket);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  static async deleteTicket(req, res) {
    try {
      const ticketId = req.params.id;
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      if (req.userId !== ticket.createdBy.toString() && req.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      await Ticket.findByIdAndDelete(ticketId);
      return res
        .status(204)
        .json({ message: `Ticket ${ticketId} was deleted Successfully ` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  static async getMyTickets(req, res) {
    try {
      const createdBy = req.userId;
      const tickets = await Ticket.find({ createdBy });
      return res.status(200).json(tickets);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }
}
