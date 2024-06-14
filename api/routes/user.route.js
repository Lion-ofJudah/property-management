import express from "express";
import {
  test,
  updateUser,
  getUserListing,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifiedUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.get("/listings/:id", verifyToken, getUserListing);
router.get("/get-user/:id", getUser);

export default router;
