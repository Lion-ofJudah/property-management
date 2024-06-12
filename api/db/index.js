import mongoose from "mongoose";
import { config } from "dotenv";

config();

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect(process.env.MONGODB, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });
  console.log("Connection to DB successful");
}
