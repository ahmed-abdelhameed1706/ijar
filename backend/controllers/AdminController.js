import Car from "../models/CarSchema";
import User from "../models/UserSchema";
import Ticket from "../models/TicketSchema";
import Cart from "../models/CartSchema";

export default class AdminController {
  // USERS MANAGEMENT
  static getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Default to page 1 if not specified
    const limit = 10;

    try {
      const count = await User.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const users = await User.aggregate([
        {
          $skip: (page || 0) * limit,
        },
        {
          $limit: limit,
        },
      ]);

      res.status(200).json({
        users,
        page,
        totalPages,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await User.findByIdAndDelete(userId);

      await Ticket.deleteMany({ createdBy: userId });

      await Cart.deleteMany({ userId: userId });

      await Car.deleteMany({ ownerId: userId });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  static updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  // CARS MANAGEMENT
  static getAllCars = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Default to page 1 if not specified
    const limit = 10;

    try {
      const cars = await Car.aggregate([
        {
          $skip: (page || 0) * limit,
        },
        {
          $limit: limit,
        },
        {
          $sort: { averageRate: -1 },
        },
        {
          $lookup: {
            from: "users",
            localField: "ownerId",
            foreignField: "_id",
            as: "owner",
          },
        },
        { $unwind: "$owner" },
      ]);
      const count = await Car.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const newCars = cars.map((car) => {
        const { _id, ...rest } = car;
        return { id: _id, ...rest };
      });

      res.status(200).json({
        cars: newCars,
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
      const carId = req.params.id;
      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      await Car.findByIdAndDelete(carId);

      await Cart.deleteMany({ carId });

      res.status(200).json({ message: "Car deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  // TICKETS MANAGEMENT
  static getAllTickets = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Default to page 1 if not specified
    const limit = 10;
    try {
      const count = await Ticket.countDocuments();
      const totalPages = Math.ceil(count / limit);

      const tickets = await Ticket.find()
        .skip(page * limit)
        .limit(limit)
        .populate("createdBy", "email");

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

  static updateTicket = async (req, res) => {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true },
      );
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.status(200).json({ message: "Ticket updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  // CARTS MANAGEMENT
  static getAllCarts = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Default to page 1 if not specified
    const limit = 10;
    try {
      const count = await Cart.countDocuments();
      const totalPages = Math.ceil(count / limit);

      const carts = await Cart.find()
        .skip(page * limit)
        .limit(limit)
        .populate("carId", "brandName model")
        .populate("userId", "fullName");

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
