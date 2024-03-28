import express from "express";
import UserController from "../controllers/UserController";
import { verifyToken } from "../utils/middlewares";
import { isAdmin } from "../utils/middlewares";

const userRouter = express.Router();

userRouter.get("/users", verifyToken, UserController.getUser);

userRouter.put("/users", verifyToken, UserController.updateUser);

userRouter.put(
  "/users/update_password",
  verifyToken,
  UserController.updatePassword
);

userRouter.get("/user", isAdmin, UserController.getUserById);

userRouter.delete("/users", verifyToken, UserController.deleteUser);

userRouter.post("/users/reset_password", UserController.forgotPassword);

userRouter.get("/users/reset_password/:token", UserController.getResetForm);

userRouter.put("/users/reset_password", UserController.resetPassword);

export default userRouter;
