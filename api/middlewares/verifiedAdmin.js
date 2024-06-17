import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return errorHandler(res, 401, "Unauthorized - Missing token!");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const admin = await Admin.findById(decodedToken._id);

    if (!admin) {
      return errorHandler(res, 401, "Unauthorized - Invalid token!");
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return errorHandler(res, 401, "Unauthorized - Invalid token!");
  }
};

export const authorizeAdminCreation = (req, res, next) => {
  if (!req.admin.canCreateAdmin) {
    return errorHandler(res, 403, "Forbidden - Insufficient privileges!");
  }
  next();
};
