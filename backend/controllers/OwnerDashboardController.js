import Car from "../models/CarSchema";

export default class OwnerDashboardController {
  static getCarListings = async (req, res) => {
    try {
      const cars = await Car.find({ ownerId: req.userId });
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
