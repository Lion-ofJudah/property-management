import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
