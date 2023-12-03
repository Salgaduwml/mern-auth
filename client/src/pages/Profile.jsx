import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-md mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Prifile</h1>
      <form action="" className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt=""
          className="rounded-full object-contain w-24 h-24 align-middle self-center border mt-2"
        />
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
