import { Schema, model } from "mongoose";

// Create CommentSchema

const CommentSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: "User",
  },
  carId: {
    type: Schema.ObjectId,
    required: true,
    ref: "Car",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const Comment = model("Comment", CommentSchema);
export default Comment;
