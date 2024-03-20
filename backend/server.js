import mongoose from "mongoose";
import express from "express";
import carRouter from "./routes/carRouter";
import commentRouter from "./routes/commentRoutes";
import authRouter from "./routes/authRoutes";
import cors from "cors";
import swaggerDocs from "./utils/swagger";
import cartRouter from "./routes/cartRoutes";
import ownerDashboardRouter from "./routes/ownerDashboardRoutes";
import userRouter from "./routes/userRouters";
import filterRouter from "./routes/filterRouter";
import ticketRouter from "./routes/ticketRoutes";
import { activityLogger } from "./utils/middlewares";
import path from "path";

const port = 5000;
const app = express();

// Middleware
app.use(express.json());

// CORS
app.use(cors());

// Activity logger
app.use(activityLogger);

app.disable("x-powered-by");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Ijar", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// Event listeners for MongoDB connection
mongoose.connection.on("connected", () => {
  // Start the server after successful connection
  try {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
    swaggerDocs(app, port);
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
app.use("/api/owner-dashboard", ownerDashboardRouter);
app.use("/api", userRouter);
app.use("/search", filterRouter);
app.use("/api", ticketRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
