import Car from "../models/CarSchema";
import User from "../models/UserSchema";
import Comment from "../models/CommentSchema";
import Cart from "../models/CartSchema";

class CarController {
  static async postCar(req, res) {
    const user = await User.findById(req.userId);

    if (!user || user.role === "user") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.body.ownerId = user.id;
    try {
      const car = new Car(req.body);
      await car.save();
      const { _id, ...rest } = car._doc;
      res.status(201).json({ id: _id, ...rest });
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async getCar(req, res) {
    const carId = req.params.id;

    try {
      const car = await Car.findById(carId).populate("ownerId", "fullName");
      if (!car) {
        return res.status(404).json({ error: "Not found" });
      }
      const comments = await Comment.aggregate([
        {
          $match: { carId: car._id },
        },
        {
          $limit: 20,
        },
      ]);
      const { _id, ...rest } = car._doc;
      return res.json({ id: _id, ...rest, comments });
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async getCars(req, res) {
    const page = req.query.page || 0;
    const ownerId = req.query.ownerId;
    const limit = Number(req.query.limit) || 10;
    const filter = {};

    if (ownerId) filter.ownerId = ownerId;

    try {
      const cars = await Car.find(filter)
        .skip(page * limit)
        .sort({ averageRate: -1 })
        .limit(limit);

      const newCars = cars.map((car) => {
        const { _id, ...rest } = car._doc;
        return { id: _id, ...rest };
      });

      return res.json(newCars);
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async updateCar(req, res) {
    try {
      const carId = req.params.id;
      const data = Object.keys(req.body);

      const user = await User.findById(req.userId);

      if (!user || user.role === "user") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (data.includes("averageRate")) {
        return res.status(403).json({
          error: "Forbidden",
          message: "You cannot update your car rate.",
        });
      }

      const car = await Car.findOne({
        _id: carId,
        ownerId: user._id,
      });

      if (!car) {
        return res.status(404).json({ error: "Not found" });
      }
      const newCar = await Car.findByIdAndUpdate(car.id, req.body, {
        returnOriginal: false,
      });
      const { _id, ...rest } = newCar._doc;
      return res.json({ id: _id, ...rest });
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static async deleteCar(req, res) {
    const carId = req.params.id;

    try {
      const user = await User.findById(req.userId);

      if (!user || user.role === "user") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const car = await Car.findOne({
        _id: carId,
        ownerId: user._id,
      });

      if (!car) {
        return res.status(404).json({ error: "Not found" });
      }
      await Comment.deleteMany({ userId: user.id });
      await Car.findByIdAndDelete(car.id);
      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: e.message,
      });
    }
  }

  static addCarToCart = async (req, res) => {
    try {
      const userId = req.userId;
      const { carId, startDate, endDate } = req.body;
      const car = await Car.findById(carId);
      if (!car || !car.available) {
        return res
          .status(404)
          .json({ error: "Car not found or it's not available" });
      }

      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
      if (parsedStartDate > parsedEndDate) {
        return res
          .status(400)
          .json({ error: "End date cannot be before start date!" });
      }
      const rentalDays = Math.ceil(
        (parsedEndDate - parsedStartDate) / (1000 * 60 * 60 * 24)
      );
      const totalCost = car.price * rentalDays;

      car.available = false;

      await car.save();

      const newCart = new Cart({
        userId,
        carId,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        rentalTerm: rentalDays,
        totalCost,
      });

      await newCart.save();
      return res.status(201).json(newCart);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };
}

export default CarController;
