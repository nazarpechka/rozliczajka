import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="container mx-auto flex justify-between items-center py-6 px-4 shadow-md">
      <h1 className="text-2xl text-gray-700 hover:text-gray-900 transition duration-150">
        <Link to="/">Rozliczajka</Link>
      </h1>

      <ul className="flex gap-6">
        <li>
          <a
            href="/"
            className="border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition duration-150"
          >
            Zaloguj się
          </a>
        </li>
        <li>
          <a
            href="/"
            className="border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition duration-150"
          >
            Zarejestruj się
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
