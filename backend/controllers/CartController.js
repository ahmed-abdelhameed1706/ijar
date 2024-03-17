import Cart from '../models/CartSchema';
import Car from '../models/CarSchema';
const cron = require('node-cron');

const getAllCart = async (req, res) => {
  try {
    const userId = req.userId;
    const carts = await Cart.find({ userId });
  
    const newCart = carts.map((car) => {
      const { _id, ...rest } = car._doc;
      return { id: _id, ...rest };
    });
    return (newCart)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const checkAndUpdateCars = async () => {
  const currentTime = new Date();
  const carts = await Cart.find({ endDate: { $lte: currentTime } });
  for (const cart of carts) {
    const car = await Car.findOne({ _id: cart.carId });
    car.available = true;
    car.customerId = null;
    await car.save();
    await Cart.findByIdAndDelete(cart._id);
    // Send Mail
  }
};

// Schedule the checkAndUpdateCars function to execute every hour
cron.schedule('0 * * * *', async () => {
  await checkAndUpdateCars();
});

class CartController {
  static async addToCart(req, res) {
    try {
      const data = {
        userId: req.body.userId,
        carId: req.body.carId,
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
      return res.status(200).json({ id: _id, ...rest });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getCart(req, res) {
    try {
      const newCarts = await getAllCart(req, res);
      return res.status(200).send(newCarts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteFromCart(req, res) {
    try {
      const cartId = req.params.id;
      const userId = req.userId;
      const cart = await Cart.findOne({
        _id: cartId,
        userId,
      });

      if (!cart) {
        return res.status(401).send({ error: 'Not found' });
      }

      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).send({ message: "Deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async checkout(req, res) {
    try {
      const newCarts = await getAllCart(req, res);
      const result = {
        messages: [],
        errors: []
      };

      await Promise.all(
        newCarts.map(async (c) => {
          const carId = c.carId;
          const car = await Car.findOne({ _id: carId });
          if (car) {
            if (car.available) {
              car.available = false;
              car.customerId = c.userId;
              await car.save();
              result.messages.push(`${car.brandName} Booked Successfully`);
            } else {
              if (car.customerId.toString() !== c.userId.toString()) {
                await Cart.findByIdAndDelete(c.id);
                result.errors.push(`${car.brandName} is not available`);
              }
            }
          } else {
            await Cart.findByIdAndDelete(c.id);
            result.errors.push(`Not found`);
          }
        }));

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default CartController;
