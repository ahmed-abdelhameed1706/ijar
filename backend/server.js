import mongoose from "mongoose";
import express from "express";
import carRouter from "./routes/carRouter";
import commentRouter from "./routes/commentRoutes";
import authRouter from "./routes/authRoutes";
import cors from "cors";
// import swaggerDocs from "./utils/swagger";
import swaggerSpec from "./utils/swagger";
import swaggerUi from "swagger-ui-express";
import cartRouter from "./routes/cartRoutes";
import adminRouter from "./routes/adminRouter";
import userRouter from "./routes/userRouters";
import filterRouter from "./routes/filterRouter";
import ticketRouter from "./routes/ticketRoutes";
import { activityLogger } from "./utils/middlewares";
import cookieParser from "cookie-parser";
import path from "path";
import Car from "./models/CarSchema";
import { faker } from "@faker-js/faker";

const port = 5000;
const app = express();

// Middleware
app.use(express.json());
// const options = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
// CORS
app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "http://localhost:3001"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());

// Activity logger
app.use(activityLogger);

app.disable("x-powered-by");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Ijar", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const seedDatabase = async (numCars = 10) => {
  try {
    for (let i = 0; i < numCars; i++) {
      const newCar = new Car({
        brandName: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.number.int({ min: 1950, max: 2024 }),
        type: faker.vehicle.type(),
        color: faker.vehicle.color(),
        location: faker.location.city(),
        fuel: faker.vehicle.fuel(),
        maxSpeed: faker.number.int({ min: 100, max: 350 }),
        price: faker.number.int({ min: 80, max: 1000 }),
        licensePlateNumber: faker.datatype.string({
          length: 7,
          charset: "ABC1234567890",
        }),
        engineId: faker.datatype.string({
          length: 15,
          charset: "ABCDEF1234567890",
          unique: true,
        }),
        description: faker.vehicle.vehicle(),
        ownerId: new mongoose.Types.ObjectId(),
      });

      await newCar.save();
      console.log(`Car ${i + 1} created successfully!`);
    }
    console.log(`Database populated with ${numCars} cars!`);
  } catch (error) {
    console.error("Error populating database:", error);
  }
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Event listeners for MongoDB connection
mongoose.connection.on("connected", () => {
  // Start the server after successful connection
  try {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
    seedDatabase(50);
  } catch (error) {
    console.log("Cannot connect to the server");
  }
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err);
});

// Routes
app.use("/api", carRouter);
app.use("/api", commentRouter);
app.use("/api", cartRouter);
app.use("/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api", userRouter);
app.use("/search", filterRouter);
app.use("/api", ticketRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
