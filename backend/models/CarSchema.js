import { Schema, model } from "mongoose";

// Create CarSchema for Object Car

const CarSchema = new Schema({
  brandName: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  licensePlateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  images: {
    type: Array,
  },
  ownerId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  customerId: {
    type: Schema.ObjectId,
    ref: "User",
  },
  engineId: {
    type: String,
    required: true,
    unique: true,
  },
  averageRate: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
});

const Car = model("Car", CarSchema);
export default Car;
