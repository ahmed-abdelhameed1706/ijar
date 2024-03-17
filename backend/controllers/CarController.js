import Car from "../models/CarSchema";
import User from "../models/UserSchema";
import Comment from "../models/CommentSchema";

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
      return res.status(400).json({ error: e.message });
    }
  }

  static async getCar(req, res) {
    const carId = req.params.id;

    try {
      const car = await Car.findById(carId);
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
      return res.status(400).json({ error: e.message });
    }
  }

  static async getCars(req, res) {
    const page = req.query.page || 0;
    const ownerId = req.query.ownerId;
    const filter = {};

    if (ownerId) filter.ownerId = ownerId;

    try {
      const cars = await Car.aggregate([
        {
          $match: filter,
        },
        {
          $skip: page * 20,
        },
        {
          $limit: 20,
        },
      ]);
      const newCars = cars.map((car) => {
        const { _id, ...rest } = car;
        return { id: _id, ...rest };
      });
      return res.json(newCars);
    } catch (e) {
      return res.status(400).json({ error: e.message });
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
      return res.status(400).json({ error: e.message });
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
      await Comment.deleteMany({ carId: car.id });
      await Car.findByIdAndDelete(car.id);
      return res.status(204).json();
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

export default CarController;
