import express from "express";
import "./db/index.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
