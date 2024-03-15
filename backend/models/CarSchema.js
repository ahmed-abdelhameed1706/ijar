import { Binary, Schema, model } from 'mongodb';
/*
 */
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
  status: {
    type: String,
    required: true,
  },
  images: {
    type: Binary,
    required: true,
  },
  ownerID: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
  },
  engineId: {
    type: String,
    required: true,
    unique: true,
  },
  averageRate: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const Car = model('Car', CarSchema);
export default Car;
