import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
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
    isAdmin: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    canCreateAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashedPassword;
  }
  next();
});

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.createAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: true },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
