import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  brithDate: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Owner", "Admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetToken: {
    type: String,
    default: "",
  },
  verificationToken: {
    type: String,
  },
  imageUrl: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/ijarapp-11.appspot.com/o/cars%2F98a33308-44eb-4409-93fb-2ae2662f38b3?alt=media&token=12ef59dd-dfdf-4d1c-9e35-c9b7944a1df1",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
