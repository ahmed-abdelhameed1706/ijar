import * as jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import Car from '../models/CarSchema';
import User from '../models/UserSchema';

class CarController {
  static async postCar(req, res) {
    const token = req.header('Authorization');
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(Schema.ObjectId(userId));

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    req.body.ownerId = user.id;

    const car = new Car(req.body);
    car.save().catch((e) => res.status(400).send({ error: e.toString() }));
    const { _id, ...rest } = car;
    res.status(201).json({ id: _id, ...rest });
  }

  static async getCar(req, res) {
    const carId = req.params.id;

    const car = await Car.findById(Schema.ObjectId(carId));
    if (!car) {
      return res.status(404).json({ error: 'Not found' });
    }
    const { _id, ...rest } = car;
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
    const carId = req.params.id;
    const data = req.body.data;
    const token = req.header('Authorization');
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(Schema.ObjectId(userId));

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const car = await Car.findById(Schema.ObjectId(carId));

    if (!car) {
      return res.status(404).send({ error: 'Not found' });
    }
    const newCar = await Car.findByIdAndUpdate(car.id, data);
    const { _id, isPublic, ...rest } = newCar;
    return res.send({ id: _id, ...rest });
  }

  static async deleteCar(req, res) {
    const carId = req.params.id;
    const data = req.body.data;
    const token = req.header('Authorization');
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(Schema.ObjectId(userId));

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const car = await Car.findById(Schema.ObjectId(carId));

    if (!car) {
      return res.status(404).send({ error: 'Not found' });
    }
    await Car.findOneAndDelete(car.id);
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
