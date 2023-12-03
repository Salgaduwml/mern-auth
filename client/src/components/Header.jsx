import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-100">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="font-bold text-lg">MERN Auth</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-x-8">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/about"}>
              <li>About</li>
            </Link>
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.profilePicture}
                  alt=""
                  className="h-7 rounded-full object-cover"
                />
              </Link>
            ) : (
              <Link to={"/sign-in"}>
                <li>Sign in</li>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
