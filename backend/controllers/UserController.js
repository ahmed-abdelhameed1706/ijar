import User from '../models/UserSchema';
import bcrypt from 'bcryptjs';

export default class UserController {
  static signUp = async (req, res) => {
    try {
      const { fullName, email, password, phoneNumber, address, role } =
        req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
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

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
}
