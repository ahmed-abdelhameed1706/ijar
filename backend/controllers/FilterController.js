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
        location,
        fuel,
        page,
      } = req.query;

      const filter = { available: true };
      if (brandName)
        filter.brandName = {
          $regex: new RegExp(`[${brandName}]{${brandName.length},}`, "i"),
        };
      if (type) filter.type = type;
      if (color)
        filter.color = {
          $regex: new RegExp(`[${color}]{${color.length},}`, "i"),
        };
      if (model)
        filter.model = {
          $regex: new RegExp(`[${model}]{${model.length},}`, "i"),
        };
      if (location)
        filter.location = {
          $regex: new RegExp(`[${location}]{${location.length},}`, "i"),
        };
      if (fuel) filter.fuel = fuel;
      if (minPrice && maxPrice)
        filter.price = { $gte: minPrice, $lte: maxPrice };
      else if (minPrice) filter.price = { $gte: minPrice };
      else if (maxPrice) filter.price = { $lte: maxPrice };
      if (minYear && maxYear) filter.year = { $gte: minYear, $lte: maxYear };
      else if (minYear) filter.year = { $gte: minYear };
      else if (maxYear) filter.year = { $lte: maxYear };

      const cars = await Car.find(filter)
        .sort({ averageRate: -1 })
        .skip(page * 10)
        .limit(10);
      const count = await Car.countDocuments(filter);
      const numberPages = Math.ceil(count / 10);
      const newCars = cars.map((car) => {
        const { _id, ...rest } = car._doc;
        return { id: _id, ...rest };
      });

      return res.json({ cars: newCars, numberPages });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}
