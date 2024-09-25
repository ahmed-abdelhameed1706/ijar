import express from "express";
import { verifyToken } from "../utils/middlewares.js";
import CommentController from "../controllers/CommentController.js";

const commentRouter = express.Router();

commentRouter.post("/comments", verifyToken, CommentController.postComment);

commentRouter.get("/comments/:carId", CommentController.getComments);

commentRouter.delete(
  "/comments/:id",
  verifyToken,
  CommentController.deleteComment
);

export default commentRouter;
