import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cx from "classnames";

import UserContext from "../contexts/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const navigationNotLoggedIn = [
    {
      label: "Zaloguj się",
      url: "/login",
    },
    {
      label: "Zarejestruj się",
      url: "/signup",
    },
  ];
  const navigationLoggedIn = [
    {
      label: "Moje Grupy",
      url: "/groups",
    },
    {
      label: "Wydatki",
      url: "/expenses",
    },
    {
      label: "Długi",
      url: "/debts",
    },
    {
      label: "Potwierdzenia",
      url: "/confirmations",
    },
    {
      label: "Wyloguj się",
      url: "/logout",
    },
  ];

  const navigation = user ? navigationLoggedIn : navigationNotLoggedIn;
  const atHome = location.pathname === "/";
  const className = atHome
    ? "-mb-60 z-10 text-white"
    : "shadow-md shadow-orange-500/25";

  return (
    <header className={cx(className, "w-full py-6")}>
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl hover:scale-105 transition duration-150">
          <NavLink to="/">Rozliczajka</NavLink>
        </h1>
        <ul className="flex gap-6">
          {navigation.map(({ url, label }) => (
            <li key={label}>
              <NavLink
                to={url}
                className={({ isActive }) =>
                  (isActive ? "text-primary" : "") +
                  (!user && atHome
                    ? "border border-white hover:bg-white hover:text-primary px-4 py-2 rounded-md transition duration-150 text-lg"
                    : "")
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
