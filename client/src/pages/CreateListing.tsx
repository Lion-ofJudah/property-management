import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import Checkbox from "../components/Checkbox";
import RippleButton from "../components/RippleButton";
import { useNavigate } from "react-router-dom";

interface Props {
  currentUser: any;
}

export default function CreateListing({ currentUser }: Props) {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    type: "rent",
    offer: false,
    parking: false,
    furnished: false,
    userRef: currentUser._id,
  });
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState({
    status: false,
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(formData);

  const handleImageInputChange = (event: any) => {
    setFiles(event.target.files);
  };

  const handleChange = (event: any) => {
    if (event.target.id === "sell" || event.target.id === "rent") {
      setFormData({
        ...formData,
        type: event.target.id,
      });
    }

    if (
      event.target.id === "parking" ||
      event.target.id === "furnished" ||
      event.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [event.target.id]: event.target.checked,
      });
    }

    if (
      event.target.type === "number" ||
      event.target.type === "text" ||
      event.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleFileUpload = async (file: File) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              resolve(downloadURL);
            }
          );
        }
      );
    });
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 11) {
      setUploading(true);
      setImageUploadError({ status: false, message: "" });
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(handleFileUpload(files[i]));
      }

      Promise.all(promises)
        .then((urls: any) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError({ status: false, message: "" });
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError({
            status: false,
            message: "Image upload failed (2mb max per image)",
          });
          setUploading(false);
        });
    } else if (files.length + formData.imageUrls.length > 10) {
      setImageUploadError({
        status: true,
        message: "Image upload failed (maximum of 10 image upload is allowed)",
      });
      setUploading(false);
    } else {
      setImageUploadError({
        status: true,
        message: "Image upload failed (minimum of 1 image upload is allowed)",
      });
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: Number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (formData.imageUrls.length < 1) {
        setError("At least one image must be uploaded!");
        setLoading(false);
        return;
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        setError("Discount price must be lower than regular price!");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col -mt-20 px-4 max-w-4xl mx-auto box-border h-[calc(100vh-80px)] bg-background">
      <h1 className="text-3xl font-semibold text-center mt-32">
        Create your property
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-10 md:flex-row mt-10">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="title"
              className="border py-2 px-3 w-full rounded-xl focus:border-none focus:outline-secondary"
              id="title"
              maxLength={62}
              minLength={10}
              onChange={handleChange}
              value={formData.title}
              required
            />
            <textarea
              placeholder="Description"
              className="border py-2 px-3 w-full rounded-xl focus:border-none focus:outline-secondary"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="address"
              className="border py-2 px-3 w-full rounded-xl focus:border-none focus:outline-secondary"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex flex-wrap justify-between mt-6">
              <Checkbox
                id="sell"
                onChange={handleChange}
                checked={formData.type === "sell"}
              >
                Sell
              </Checkbox>
              <Checkbox
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
              >
                Rent
              </Checkbox>
              <Checkbox
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              >
                Parking Slot
              </Checkbox>
              <Checkbox
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              >
                Furnished
              </Checkbox>
              <Checkbox
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              >
                Offer
              </Checkbox>
            </div>
            <div className="flex gap-5 sm:gap-20 mt-6">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bedrooms"
                  min="0"
                  required
                  onChange={handleChange}
                  value={formData.bedrooms}
                  className="px-3 py-2 border w-14 sm:w-28 rounded-xl focus:border-none focus:outline-secondary"
                />
                <span>Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="0"
                  required
                  onChange={handleChange}
                  value={formData.bathrooms}
                  className="px-3 py-2 border w-14 sm:w-28 rounded-xl focus:border-none focus:outline-secondary"
                />
                <span>Bathrooms</span>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="regularPrice"
                  min="0"
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                  className="px-3 py-2 border w-28 rounded-xl focus:border-none focus:outline-secondary"
                />
                <div className="flex flex-col justify-center items-center">
                  <p>Regular price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">(birr/month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="flex flex-gap-2 items-center gap-3">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    required
                    onChange={handleChange}
                    value={formData.discountPrice}
                    className="px-3 py-2 border w-28 rounded-xl focus:border-none focus:outline-secondary"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <p>Discounted price</p>
                    {formData.type === "rent" && (
                      <span className="text-xs">(birr/month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 mt-6 sm:mt-0">
            <p className="font-bold">
              Images:{" "}
              <span className="font-normal text-gray-600">
                Inset your property images (max: 10)
              </span>
            </p>
            <div className="flex gap-4 mt-4">
              <div className="relative w-9/12">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageInputChange}
                />
                <label
                  htmlFor="images"
                  className="border border-gray-200 p-2 rounded-2xl cursor-pointer bg-accent text-background text-center w-full block"
                >
                  {files.length > 0
                    ? files.length > 1
                      ? `${files.length} files selected`
                      : `${files.length} file selected`
                    : "Choose Files"}
                </label>
              </div>
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="border-secondary p-2 rounded-2xl bg-secondary font-semibold text-fontColor"
              >
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>
            <p className="text-red-500 text-center mt-3">
              {imageUploadError.status && imageUploadError.message}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => {
                return (
                  <div className="flex justify-around items-center mt-4 border rounded-2xl py-1">
                    <img
                      src={url}
                      key={url}
                      alt="image"
                      className="size-20 object-cover rounded-lg border"
                    />
                    <span
                      onClick={() => {
                        handleRemoveImage(index);
                      }}
                      className="cursor-pointer border p-1 border-gray-200 rounded-md hover:bg-secondary hover:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <RippleButton
          disabled={loading || uploading}
          className="p-3 bg-primary rounded-2xl text-background mt-10 w-full text-xl"
        >
          {loading ? "Creating Property" : "Create Property"}
        </RippleButton>
        {error && <p className="text-red-700 mt-3 text-center">{error}</p>}
      </form>
    </div>
  );
}
