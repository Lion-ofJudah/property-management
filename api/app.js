import express from "express";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import adminRouter from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import "./db/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
