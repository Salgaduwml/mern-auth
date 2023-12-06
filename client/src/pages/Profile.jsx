import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOut,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const filePickerRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(updateSuccess(data));
        setIsUpdateSuccess(true);
      } else {
        dispatch(updateFailure(data));
      }
    } catch (error) {
      dispatch(updateFailure(error));
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteSuccess());
      } else {
        dispatch(deleteFailure(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Prifile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-center">
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
          id="username"
          type="text"
          placeholder="username"
          className="p-3 bg-slate-100 rounded border"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          id="email"
          type="email"
          placeholder="email"
          className="p-3 bg-slate-100 rounded border"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 bg-slate-100 rounded border"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-3 text-white rounded hover:opacity-95">
          {loading ? "loading..." : "Update"}
        </button>
      </form>
      <div className="flex items-center justify-between mt-4">
        <span className="text-red-500 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-500 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      {error && <p className="text-red-500">something went wrong</p>}
      {isUpdateSuccess && (
        <p className="text-green-500">User is updated successfully</p>
      )}
    </div>
  );
}
