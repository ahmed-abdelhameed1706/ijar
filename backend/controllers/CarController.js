import Car from '../models/CarSchema';
import User from '../models/UserSchema';

class CarController {
  static async postCar(req, res) {
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    req.body.ownerId = user.id;
    try {
      const car = new Car(req.body);
      await car.save();
      const { _id, ...rest } = car._doc;
      res.status(201).json({ id: _id, ...rest });
    } catch (e) {
      return res.status(400).send({ error: e.message });
    }
  }

  static async getCar(req, res) {
    const carId = req.params.carId;

    const car = await Car.findById(carId);
    console.log(car._doc);
    if (!car) {
      return res.status(404).json({ error: 'Not found' });
    }
    const { _id, ...rest } = car._doc;
    return res.json({ id: _id, ...rest });
  }

  static async getCars(req, res) {
    const page = req.query.page || 0;

    const cars = await Car.aggregate([
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
    return res.send(newCars);
  }

  static async updateCar(req, res) {
    const carId = req.params.carId;
    const data = req.body;

    const user = await User.findById(req.userId);

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const car = await Car.findOne({
      _id: carId,
      ownerId: user._id,
    });

    if (!car) {
      return res.status(404).send({ error: 'Not found' });
    }
    const newCar = await Car.findByIdAndUpdate(car.id, data);
    const { _id, isPublic, ...rest } = newCar._doc;
    return res.send({ id: _id, ...rest, ...data });
  }

  static async deleteCar(req, res) {
    const carId = req.params.carId;
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const car = await Car.findOne({
      _id: carId,
      ownerId: user._id,
    });

    if (!car) {
      return res.status(404).send({ error: 'Not found' });
    }
    await Car.findByIdAndDelete(car.id);
    return res.status(204).send();
  }

  static async searchCar(req, res) {
    const { page, ...filter } = req.query;

    const cars = await Car.aggregate([
      {
        $match: filter,
      },
      {
        $skip: (page || 0) * 20,
      },
      {
        $limit: 20,
      },
    ]);
    const newCars = cars.map((car) => {
      const { _id, ...rest } = car;
      return { id: _id, ...rest };
    });
    return res.send(newCars);
  }
}

export default CarController;
