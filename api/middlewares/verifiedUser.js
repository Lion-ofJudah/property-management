import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return errorHandler(res, 401, "Unauthorized user!");
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      return errorHandler(res, 401, "Unauthorized user!");
    }

    console.log(user);

    req.user = user;
    next();
  });
};
