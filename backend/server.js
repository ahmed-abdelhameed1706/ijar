import mongoose from "mongoose";
import express from "express";
import carRouter from "./routes/carRouter.js";
import commentRouter from "./routes/commentRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
// import swaggerDocs from "./utils/swagger";
import swaggerSpec from "./utils/swagger.js";
import swaggerUi from "swagger-ui-express";
import cartRouter from "./routes/cartRoutes.js";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouters.js";
import filterRouter from "./routes/filterRouter.js";
import ticketRouter from "./routes/ticketRoutes.js";
import { activityLogger } from "./utils/middlewares.js";
import cookieParser from "cookie-parser";
import path from "path";

import payPalRouter from "./routes/payPalRouter.js";
import { connectToMongo } from "./db/connectToMongo.js";

import dotenv from "dotenv";

dotenv.config();

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
// mongoose.connect("mongodb://localhost:27017/Ijar", {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Event listeners for MongoDB connection
// mongoose.connection.on("connected", () => {
//   // Start the server after successful connection
//   try {
//     app.listen(port, () => {
//       console.log(`Server connected to http://localhost:${port}`);
//     });
//     // if (process.env.SEED_DATA === "true") {
//     //   seedDatabase(5, 10, 4);
//     // }
//   } catch (error) {
//     console.log("Cannot connect to the server");
//   }
// });

// mongoose.connection.on("error", (err) => {
//   console.error("Failed to connect to MongoDB:", err);
// });

// Routes
app.use("/api", carRouter);
app.use("/api", commentRouter);
app.use("/api", cartRouter);
app.use("/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api", userRouter);
app.use("/search", filterRouter);
app.use("/api", ticketRouter);
app.use("/api", payPalRouter);

const __dirname = path.resolve();
// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  connectToMongo();
  console.log(`Server connected to http://localhost:${port}`);
});
