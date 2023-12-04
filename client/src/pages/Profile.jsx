import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const filePickerRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="max-w-md mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Prifile</h1>
      <form action="" className="flex flex-col gap-4 text-center">
        <input
          type="file"
          ref={filePickerRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt=""
          className="rounded-full object-contain w-24 h-24 align-middle self-center border mt-2 cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        />
        {imageError ? (
          <p className="text-red-500">Error uploading image</p>
        ) : imagePercent > 0 && imagePercent < 100 ? (
          <p className="text-slate-700">{`uploading ${imagePercent}%`}</p>
        ) : imagePercent === 100 ? (
          <p className="text-green-600">Image uploaded successfully</p>
        ) : (
          ""
        )}
        <input
          defaultValue={currentUser.username}
          type="text"
          placeholder="username"
          className="p-3 bg-slate-100 rounded border"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="email"
          className="p-3 bg-slate-100 rounded border"
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 bg-slate-100 rounded border"
        />
        <button className="bg-slate-700 p-3 text-white rounded hover:opacity-95">
          Update
        </button>
      </form>
      <div className="flex items-center justify-between mt-4">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
