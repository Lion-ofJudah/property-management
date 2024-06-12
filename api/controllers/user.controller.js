import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "Hello from user controller" });
};

export const updateUser = async (req, res) => {
  console.log(req.user._id);
  console.log(req.params.id);
  if (req.user._id !== req.params.id) {
    return errorHandler(res, 401, "You can only update your own account.");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        userName: req.body.userName,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );
  const { password: pass, ...rest } = updatedUser._doc;
  res.status(200).send(rest);
};
