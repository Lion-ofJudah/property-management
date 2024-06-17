import Admin from "../models/admin.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createAdmin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return errorHandler(res, 400, "Admin with this email already exists!");
    }

    const creator = req.admin;

    if (!creator || creator.canCreateAdmin === false) {
      return errorHandler(res, 400, "Forbidden - Insufficient privileges!");
    }

    const newAdmin = new Admin({
      userName,
      email,
      password,
      createdBy: creator._id,
    });

    await newAdmin.save();

    const { password: pass, ...others } = newAdmin._doc;

    res
      .status(201)
      .json({ user: others, message: "Admin account created successfully!" });
  } catch (error) {
    console.error("Error creating admin account:", error);
    return errorHandler(res, 500, "Internal server error.");
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return errorHandler(res, 400, "Invalid email or password!");
    }

    const isPasswordSimilar = await admin.comparePassword(password);
    if (!isPasswordSimilar) {
      return errorHandler(res, 400, "Invalid email or password!");
    }

    const token = admin.createAuthToken();

    const { password: pass, ...others } = admin._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ user: others, token });
  } catch (error) {
    console.error("Error logging in admin,", error);
    return errorHandler(res, 500, "Internal server error.");
  }
};

export const getListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const offer = req.query.offer
      ? req.query.offer === "true"
      : { $in: [false, true] };
    const furnished = req.query.furnished
      ? req.query.furnished === "true"
      : { $in: [false, true] };
    const parking = req.query.parking
      ? req.query.parking === "true"
      : { $in: [false, true] };
    const type = req.query.type ? req.query.type : { $in: ["sell", "rent"] };
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      title: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings", error);
    errorHandler(res, 500, "Server error while fetching listings.");
  }
};
