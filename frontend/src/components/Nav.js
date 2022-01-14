import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="container mx-auto flex justify-between items-center py-6">
      <h1 className="text-2xl hover:scale-105 transition duration-150">
        <Link to="/">Rozliczajka</Link>
      </h1>

      <ul className="flex gap-6">
        <Link to="/">
          <li className="border border-white hover:bg-white hover:text-primary px-4 py-2 rounded-md transition duration-150 text-lg">
            Zaloguj się
          </li>
        </Link>
        <Link to="/">
          <li className="border border-white hover:bg-white hover:text-primary px-4 py-2 rounded-md transition duration-150 text-lg">
            Zarejestruj się
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
