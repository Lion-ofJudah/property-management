import mongoose from "mongoose";
import { config } from "dotenv";

config();

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect(process.env.MONGODB);
  console.log("Connection to DB successful");
}
