import User from "../models/UserSchema";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/middlewares";

export default class AuthController {
  static signUp = async (req, res) => {
    try {
      const { fullName, email, password, phoneNumber, address, role } =
        req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role,
      });
      console.log(newUser);

      await newUser.save();

      res.status(201).json({
        userId: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        address: newUser.address,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const accessToken = generateAccessToken(user);

      res.status(200).json({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        accessToken,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}
