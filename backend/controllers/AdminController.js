import Car from "../models/CarSchema";
import User from "../models/UserSchema";
import Ticket from "../models/TicketSchema";
import Cart from "../models/CartSchema";

export default class AdminController {
  // USERS MANAGEMENT
  static getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = 10;

    try {
      const count = await User.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const offset = (page - 1) * limit;

      const users = await User.find().skip(offset).limit(limit);

      res.status(200).json({
        users,
        currentPage: page,
        totalPages,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await User.findByIdAndDelete(user._id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  // CARS MANAGEMENT
  static getAllCars = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = 10;

    try {
      const count = await Car.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const offset = (page - 1) * limit;

      const cars = await Car.find()
        .skip(offset)
        .limit(limit)
        .populate("ownerId", "fullName");

      res.status(200).json({
        cars,
        currentPage: page,
        totalPages,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };

  static deleteCar = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      await Car.findByIdAndDelete(car._id);
      res.status(200).json({ message: "Car deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  // TICKETS MANAGEMENT
  static getAllTickets = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = 10;
    try {
      const count = await Ticket.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const offset = (page - 1) * limit;

      const tickets = await Ticket.find().skip(offset).limit(limit);

      res.status(200).json({
        tickets,
        currentPage: page,
        totalPages,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  static deleteTicket = async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      await Ticket.findByIdAndDelete(ticket._id);
      res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  // CARTS MANAGEMENT
  static getAllCarts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = 10;
    try {
      const count = await Cart.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const offset = (page - 1) * limit;

      const carts = await Cart.find().skip(offset).limit(limit);

      res.status(200).json({
        carts,
        currentPage: page,
        totalPages,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  static deleteCart = async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      await Cart.findByIdAndDelete(cart._id);
      res.status(200).json({ message: "Cart deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };
}
