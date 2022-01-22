import { useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

import Section from "../components/Section";

const Logout = () => {
  const { onLogout } = useContext(UserContext);

  useEffect(onLogout, []);

  return (
    <Section title="Wylogowano" className="flex flex-col items-center my-8" />
  );
};

export default Logout;
