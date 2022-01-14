import { Link, useLocation } from "react-router-dom";
import cx from "classnames";

const Nav = (props) => {
  const location = useLocation();
  const navigation = [
    {
      label: "Moje Grupy",
      url: "/my-groups",
    },
    {
      label: "Wydatki",
      url: "/",
    },
    {
      label: "Długi",
      url: "/",
    },
    {
      label: "Potwierdzenia",
      url: "/",
    },
    {
      label: "Wyloguj się",
      url: "/",
    },
  ];

  return (
    <nav className={cx(props.className, "w-full py-6")}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl hover:scale-105 transition duration-150">
          <Link to="/">Rozliczajka</Link>
        </h1>
        <ul className="flex gap-6">
          {props.isUserLoggedIn ? (
            <>
              {navigation.map(({ url, label }) => (
                <li
                  className={cx({
                    ["text-orange-500"]: location.pathname === url,
                  })}
                  key={label}
                >
                  <Link to={url}>{label}</Link>
                </li>
              ))}
            </>
          ) : (
            <>
              <li className="border border-white hover:bg-white hover:text-primary px-4 py-2 rounded-md transition duration-150 text-lg">
                <Link to="/login">Zaloguj się</Link>
              </li>
              <li className="border border-white hover:bg-white hover:text-primary px-4 py-2 rounded-md transition duration-150 text-lg">
                <Link to="/signup">Zarejestruj się</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;