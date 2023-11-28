import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-100">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="font-bold text-lg">MERN Auth</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-x-8">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/sign-in"}>Sign in</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
