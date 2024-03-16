import Cart from '../models/CartSchema';
import User from '../models/UserSchema';
import { ObjectId } from 'mongodb';

class CartController {
  static async addToCart(req, res) {
    try {
      const userId = req.userId;
      const data = {
        userId: ObjectId(userId),
        carId: ObjectId(req.body.carId),
        rentalTerm: req.body.rentalTerm || 1,
        totalCost: req.body.totalCost,
      };

      const date = new Date();
      date.setHours(date.getHours() + (data.rentalTerm * 24));
  
      data.endDate = date;
      data.totalCost = data.rentalTerm * data.totalCost;
      const cart = new Cart(data);
      await cart.save();
      const { _id, ...rest } = cart._doc;
      return res.status(201).json({ id: _id, ...rest });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getCart(req, res) {
    const page = req.query.page || 0;

    const cars = await Cart.aggregate([
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

  static async updateCart(req, res) {
    const carId = req.params.carId;
    const data = req.body;

    const user = await User.findById(req.userId);

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const car = await Cart.findOne({
      _id: carId,
      ownerId: user._id,
    });

    if (!car) {
      return res.status(404).send({ error: 'Not found' });
    }
    const newCar = await Cart.findByIdAndUpdate(car.id, data);
    const { _id, isPublic, ...rest } = newCar._doc;
    return res.send({ id: _id, ...rest, ...data });
  }

  static async deleteFromCart(req, res) {
    const carId = req.params.carId;
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const car = await Cart.findOne({
      _id: carId,
      ownerId: user._id,
    });

    if (!car) {
      return res.status(404).send({ error: 'Not found' });
    }
    await Cart.findByIdAndDelete(car.id);
    return res.status(204).send();
  }

  static async checkout(req, res) {
    const carId = req.params.carId;
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'owner') {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const car = await Cart.findOne({
      _id: carId,
      ownerId: user._id,
    });

    if (!car) {
      return res.status(404).send({ error: 'Not found' });
    }
    await Cart.findByIdAndDelete(car.id);
    return res.status(204).send();
  }

}

export default CartController;
