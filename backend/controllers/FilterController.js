import Car from "../models/CarSchema";

export default class FilterController {
  static async filterCars(req, res) {
    try {
      const {
        brandName,
        type,
        color,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        model,
        averageRate,
      } = req.query;

      const filter = {};
      if (brandName) filter.brandName = brandName;
      if (type) filter.type = type;
      if (color) filter.color = color;
      if (model) filter.model = model;
      if (averageRate) filter.averageRate = averageRate;
      if (minPrice && maxPrice)
        filter.price = { $gte: minPrice, $lte: maxPrice };
      else if (minPrice) filter.price = { $gte: minPrice };
      else if (maxPrice) filter.price = { $lte: maxPrice };
      if (minYear && maxYear) filter.year = { $gte: minYear, $lte: maxYear };
      else if (minYear) filter.year = { $gte: minYear };
      else if (maxYear) filter.year = { $lte: maxYear };

      const cars = await Car.find(filter);

      return res.json(cars);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}
