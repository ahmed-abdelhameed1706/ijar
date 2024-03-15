import { Schema, model } from 'mongoose';

// Create CartSchema

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  carId: {
    type: Schema.Types.ObjectId,
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
  totalCost: {
    type: Number,
    required: true,
  },
});

const Cart = model('Cart', CartSchema);
export default Cart;
