import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(201).json(listing);
};

export const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return errorHandler(res, 404, "Property not found!");
  }
  if (req.user._id !== listing.userRef) {
    return errorHandler(res, 404, "Unauthorized action!");
  }

  await Listing.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Property deleted successfully." });
};
