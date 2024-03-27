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
      "https://firebasestorage.googleapis.com/v0/b/ijarapp-11.appspot.com/o/users%2F18662e58-0635-47a7-9fdb-5fc1446768be?alt=media&token=b726ca8e-7e9f-4ee3-a122-d488d8180601",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
