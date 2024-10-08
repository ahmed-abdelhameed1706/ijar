import Cart from "../models/CartSchema.js";
import Car from "../models/CarSchema.js";
import cron from "node-cron";
import User from "../models/UserSchema.js";
import { sendEmail } from "../utils/utility.js";
import { ObjectId } from "mongoose";

const getAllCart = async (req, res) => {
  try {
    const userId = req.userId;
    const carts = await Cart.find({ userId });

    const newCart = carts.map((car) => {
      const { _id, ...rest } = car._doc;
      return { id: _id, ...rest };
    });
    return newCart;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkAndUpdateCars = async () => {
  const currentTime = new Date();
  const carts = await Cart.find({ endDate: { $lte: currentTime } });
  for (const cart of carts) {
    const car = await Car.findOne({ _id: cart.carId });
    const user = await User.findOne({ _id: cart.userId });
    const owner = await User.findOne({ _id: car.ownerId });
    car.available = true;
    car.customerId = null;
    await car.save();
    await Cart.findByIdAndDelete(cart._id);
    const htmlContentForUser = `Hello ${user.fullName},<br/><br/>
    rental time for ${car.brandName} is over.<br/>
    Please return the car to the owner ${owner.fullName}<br/><br/>
    Regards,<br/>
    Ijarapp Team`;
    const htmlContentForOwner = `Hello ${owner.fullName},<br/><br/>
    rental time for ${car.brandName} is over.<br/>
    Please collect the car from the user ${user.fullName}<br/><br/>
    Regards,<br/>
    Ijarapp Team`;
    sendEmail(user.email, "Rental Time Over", htmlContentForUser);
    sendEmail(owner.email, "Rental Time Over", htmlContentForOwner);
  }
};

// Schedule the checkAndUpdateCars function to execute every hour
cron.schedule("0 * * * *", async () => {
  await checkAndUpdateCars();
});

class CartController {
  static async addToCart(req, res) {
    try {
      const data = {
        userId: req.userId,
        carId: req.body.carId,
        rentalTerm: req.body.rentalTerm,
        totalCost: req.body.totalCost,
        endDate: req.body.endDate,
        startDate: req.body.startDate,
      };

      const car = await Car.findOne({ _id: data.carId });
      const user = await User.findOne({ _id: data.userId });

      if (!car) {
        return res.status(404).json({ error: "Not found" });
      }

      if (car.ownerId.toString() === data.userId.toString()) {
        return res.status(400).json({ error: "You can't book your own car" });
      }

      if (car.available) {
        car.available = false;
        car.customerId = data.userId;
        await car.save();
        const cart = new Cart(data);
        await cart.save();
        user.carts.push(cart._id);
        await user.save();
        const { _id, ...rest } = cart._doc;
        return res.status(200).json({ id: _id, ...rest });
      } else {
        res.status(404).json({ error: `${car.brandName} is not available` });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  static async getCart(req, res) {
    try {
      const newCarts = await getAllCart(req, res);
      return res.status(200).send(newCarts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
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
        return res.status(401).send({ error: "Not found" });
      }

      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).send({ message: "Deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async checkout(req, res) {
    try {
      const newCarts = await getAllCart(req, res);
      const result = {
        messages: [],
        errors: [],
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
        })
      );

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static getCartsByUserId = async (req, res) => {
    try {
      const userId = req.userId;
      const page = parseInt(req.query.page) || 1; // Default to page 1 if no page query parameter is provided
      const limit = 10; // Number of carts to display per page
      const skip = (page - 1) * limit; // Calculate the number of documents to skip

      const carts = await Cart.find({ userId })
        .skip(skip)
        .limit(limit)
        .populate("carId", "brandName model");
      const totalCartsCount = await Cart.countDocuments({ userId });
      const totalPages = Math.ceil(totalCartsCount / limit);

      res.status(200).json({
        carts,
        currentPage: page,
        totalPages,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

  static cancelBooking = async (req, res) => {
    console.log("======= cancel booking ======== was called");
    try {
      const cartId = req.body.id;
      console.log("cart Id: ", cartId);
      const userId = req.userId;
      console.log("user Id: ", userId);
      const cart = await Cart.findOne({
        _id: cartId,
        userId,
      });
      console.log("======= find car ========");

      if (!cart) {
        return res.status(401).send({ error: "Not found" });
      }
      console.log("======= update car ========");

      const car = await Car.findOne({ _id: cart.carId });
      car.available = true;
      await car.save();
      await Cart.findByIdAndUpdate(cart._id, { status: "Cancelled" });
      await cart.save();

      return res
        .status(200)
        .send({ message: "Booking cancelled successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default CartController;
