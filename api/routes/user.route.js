import express from "express";
import {
  test,
  updateUser,
  getUserListing,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifiedUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.get("/listings/:id", verifyToken, getUserListing);

export default router;
