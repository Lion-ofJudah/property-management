import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../features/user/userSlice";

interface Props {
  currentUser: any;
}

export default function EditProfile({ currentUser }: Props) {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const hasAvatar = currentUser.avatar && currentUser.avatar.trim() !== "";
  const [file, setFile] = useState(undefined);
  const [fileUploadPercent, setFileUploadPercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    userName: currentUser.userName,
    avatar: currentUser.avatar,
  });

  console.log("current user", currentUser);
  // console.log(fileUploadPercent);
  // console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUserStart());
    console.log("id", currentUser._id);
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
      }
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
    }
  };

  console.log(formData);

  return (
    <div>
      <div className="bg-background w-2/3 lg:w-1/3 mx-auto sm:ml-40 mt-6">
        <h2 className="text-3xl font-semibold text-fontColor">Edit profile</h2>
        <p className="text-md text-fontColor mt-2 text-justify">
          Change your profile information over here. Information you add here is
          visible to anyone who can view your profile.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-background w-2/3 lg:w-1/3 mx-auto sm:ml-40 mt-6">
          <div className="mt-10">
            <p className="text-xs cursor-pointer">Photo</p>
            <div className="mt-1 flex items-center gap-4">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(event: any) => {
                  setFile(event.target.files[0]);
                }}
              />
              {hasAvatar ? (
                <img
                  src={formData.avatar || currentUser.avatar}
                  alt="Profile picture"
                  className="rounded-full object-cover size-16 border"
                />
              ) : formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Profile picture"
                  className="rounded-full object-cover size-16 border"
                ></img>
              ) : (
                <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center size-16 rounded-full cursor-pointer">
                  <span className="text-background font-bold text-3xl">
                    {currentUser.userName[0]}
                  </span>
                </div>
              )}
              <div
                className="cursor-pointer border text-fontColor py-2 px-3 font-medium bg-secondary hover:bg-accent hover:text-background rounded-full"
                onClick={() => {
                  if (fileRef.current) {
                    fileRef.current.click();
                  }
                }}
              >
                Change
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-xs mb-1 cursor-pointer">User name</p>
            <input
              type="text"
              placeholder="User name"
              id="userName"
              defaultValue={currentUser.userName}
              onChange={handleChange}
              className="border py-2 px-3 w-full rounded-xl focus:border-none focus:outline-secondary"
            />
          </div>
        </div>
        <div className="flex fixed bottom-0 p-5 gap-8 border-t-2 w-full items-center justify-center bg-background">
          <a
            href=""
            className="border py-2 px-3 rounded-full font-semibold text-fontColor"
          >
            Reset
          </a>
          <button className="border py-2 px-3 rounded-full font-semibold text-fontColor">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
