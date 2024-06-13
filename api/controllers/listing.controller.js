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

export const updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return errorHandler(res, 404, "Property not found!");
  }

  if (req.user._id !== listing.userRef) {
    return errorHandler(res, 401, "Unauthorized action!");
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        regularPrice: req.body.regularPrice,
        discountPrice: req.body.discountPrice,
        type: req.body.type,
        imageUrls: imageUrls.push(req.body.imageUrls),
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        furnished: req.body.furnished,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedListing);
};
