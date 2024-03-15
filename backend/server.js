import mongoose from "mongoose";
import express from "express";
import router from "./routes";

const app = express();

mongoose.connect("mongodb://localhost:27017/Ijar", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
