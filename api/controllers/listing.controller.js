import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(201).json(listing);
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return errorHandler(res, 404, "Property not found!");
    }
    if (req.user._id !== listing.userRef) {
      return errorHandler(res, 404, "Unauthorized action!");
    }

    await Listing.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully." });
  } catch (error) {
    console.error("Error deleting property", error);
    errorHandler(res, 500, "Server error while deleting the property.");
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return errorHandler(res, 404, "Property not found!");
    }

    if (req.user._id !== listing.userRef) {
      return errorHandler(res, 401, "Unauthorized action!");
    }

    const updateFields = {
      title: req.body.title,
      description: req.body.description,
      address: req.body.address,
      offer: req.body.offer,
      regularPrice: req.body.regularPrice,
      discountPrice: req.body.discountPrice,
      type: req.body.type,
      imageUrls: req.body.imageUrls,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      parking: req.body.parking,
      furnished: req.body.furnished,
    };

    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        $set: {
          updateFields,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing", error);
    errorHandler(res, 500, "Server error while updating property.");
  }
};

export const getListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorHandler(res, 400, "Invalid property ID format!");
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      return errorHandler(res, 404, "Property not found!");
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    errorHandler(res, 500, "Server error while fetching the property.");
  }
};

export const getListings = async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const startIndex = parseInt(req.query.startIndex) || 0;

  let offer;
  if (req.query.offer === undefined) {
    offer = { $in: [false, true] };
  } else {
    offer = req.query.offer === "true";
  }

  let furnished;
  if (req.query.furnished === undefined) {
    furnished = { $in: [false, true] };
  } else {
    furnished = req.query.furnished === "true";
  }

  let parking;
  if (req.query.parking === undefined) {
    parking = { $in: [false, true] };
  } else {
    parking = req.query.parking === "true";
  }

  let type;
  if (req.query.type === undefined || req.query.type === "all") {
    type = { $in: ["sell", "rent"] };
  } else {
    type = req.query.type;
  }

  const searchTerm = req.query.searchTerm || "";

  const sort = req.query.sort || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;

  try {
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

    return res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return errorHandler(res, 500, "Server Error.");
  }
};
