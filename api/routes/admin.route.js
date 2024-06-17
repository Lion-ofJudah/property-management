import express from "express";
import { getListings } from "../controllers/admin.controller.js";
import {
  authenticateAdmin,
  authorizeAdminCreation,
} from "../middlewares/verifiedAdmin.js";
import { createAdmin } from "../controllers/admin.controller.js";
import { signin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/sign-in", signin);
router.post(
  "/register",
  authenticateAdmin,
  authorizeAdminCreation,
  createAdmin
);
router.get("/listings", authenticateAdmin, getListings);

export default router;
