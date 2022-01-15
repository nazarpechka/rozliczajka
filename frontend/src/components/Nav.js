import { useContext } from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames";

import UserContext from "../contexts/UserContext";

const Nav = ({ className, isLoggedIn }) => {
  const { user } = useContext(UserContext);
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

  return (
    <nav className={cx(className, "w-full py-6")}>
      <div className="container mx-auto flex justify-between items-center">
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
                  (!user
                    ? "border border-white hover:bg-white hover:text-primary px-4 py-2 rounded-md transition duration-150 text-lg"
                    : "")
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
