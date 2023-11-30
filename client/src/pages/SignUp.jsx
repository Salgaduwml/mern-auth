import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
        />
        <input
          type="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
