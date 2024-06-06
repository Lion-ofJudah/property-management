import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return errorHandler(res, 400, "Email already at use!");
  }
  const newUser = new User({
    userName,
    email,
    password,
  });

  await newUser.save();
  res.status(201).json("User created successfully!");
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return errorHandler(res, 404, "Invalid email or password!");
  }

  const isPasswordSimilar = await user.comparePassword(password);
  if (!isPasswordSimilar) {
    return errorHandler(res, 404, "Invalid email or password!");
  }

  const token = user.createAuthToken();

  const { password: pass, ...others } = user._doc;

  res.cookie("access_token", token, { httpOnly: true }).status(200).json({
    status: true,
    user: others,
  });
};
