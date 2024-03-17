import Cart from '../models/CartSchema';
import User from '../models/UserSchema';

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
      const userId = req.userId;
      const carts = await Cart.find({ userId });
  
      const newCars = carts.map((car) => {
        const { _id, ...rest } = car._doc;
        return { id: _id, ...rest };
      });
      return res.status(200).send(newCars);
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
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default CartController;
