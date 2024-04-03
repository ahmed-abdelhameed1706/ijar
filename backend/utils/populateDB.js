import Car from "../models/CarSchema";
import { faker } from "@faker-js/faker";
import { getRandomCarImages } from "./generateImages";
import User from "../models/UserSchema";
import Cart from "../models/CartSchema";
import bcrypt from "bcryptjs";

export const seedDatabase = async (
  numOwners = 5,
  numUsers = 10,
  numCarsPerOwner = 3
) => {
  try {
    // Clear all collections
    if (process.env.FLUSH_DB === "true") {
      await Car.deleteMany({});
      await User.deleteMany({});
      await Cart.deleteMany({});
    }

    // Create multiple owners
    const owners = [];
    for (let i = 0; i < numOwners; i++) {
      const owner = await User.create({
        fullName: faker.person.fullName(),
        email: faker.internet.email().toLocaleLowerCase(),
        password: await bcrypt.hash("Password1", 12),
        phoneNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
        brithDate: faker.date.birthdate({
          min: 18,
          max: 65,
          mode: "age",
        }),
        role: "Owner",
        isVerified: true,
      });
      owner.save();
      owners.push(owner);
    }

    // Create multiple users
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      const user = await User.create({
        fullName: faker.person.fullName(),
        email: faker.internet.email().toLocaleLowerCase(),
        password: await bcrypt.hash("Password1", 12),
        phoneNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
        brithDate: faker.date.birthdate({
          min: 18,
          max: 65,
          mode: "age",
        }),
        role: "User",
        isVerified: true,
      });
      users.push(user);
    }

    // Create cars for each owner
    for (const owner of owners) {
      for (let i = 0; i < numCarsPerOwner; i++) {
        const newCar = new Car({
          brandName: faker.vehicle.manufacturer(),
          model: faker.vehicle.model(),
          year: faker.number.int({ min: 1950, max: 2024 }).toString(),
          type: faker.vehicle.type(),
          color: faker.color.human(),
          location: faker.location.city(),
          fuel: faker.vehicle.fuel(),
          maxSpeed: faker.number.int({ min: 100, max: 350 }),
          price: faker.number.int({ min: 80, max: 1000 }),
          licensePlateNumber: faker.string.alphanumeric(7).toUpperCase(),
          engineId: faker.string.alphanumeric(17),
          description: faker.lorem.sentence(),
          ownerId: owner._id,
          // images: [await getRandomCarImages(), await getRandomCarImages()],
          images: [
            faker.image.urlLoremFlickr({
              category: "car",
              width: 640,
              height: 360,
            }),
            faker.image.urlLoremFlickr({
              category: "car",
              width: 640,
              height: 360,
            }),
            faker.image.urlLoremFlickr({
              category: "car",
              width: 640,
              height: 360,
            }),
            faker.image.urlLoremFlickr({
              category: "car",
              width: 640,
              height: 360,
            }),
          ],
        });

        await newCar.save();
      }
    }

    // Book cars for users and create carts
    for (const user of users) {
      const car = await Car.aggregate([
        { $match: { ownerId: { $in: owners.map((owner) => owner._id) } } },
        { $sample: { size: 1 } },
      ]);

      if (car.length > 0) {
        const cart = await Cart.create({
          userId: user._id,
          carId: car[0]._id,
          endDate: faker.date.future(),
          totalCost: faker.number.int({ min: 200, max: 1000 }),
        });
        await Car.findOneAndUpdate(
          { _id: car[0]._id },
          { $set: { available: false } }
        );
      }
    }

    console.log(`Database populated with cars, owners, users, and carts!`);
  } catch (error) {
    console.error("Error populating database:", error);
  }
};

// seedDatabase(5, 10, 4);
