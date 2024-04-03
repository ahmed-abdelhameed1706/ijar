import { Schema, model } from "mongoose";

// Create CartSchema

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  rentalTerm: {
    type: Number,
    default: 1,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Cancelled", "Completed", "Pending", "Approved"],
    default: "Pending",
  },
});

const Cart = model("Cart", CartSchema);
export default Cart;
