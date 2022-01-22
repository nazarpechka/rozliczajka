import { useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

const Logout = () => {
  const { onLogout } = useContext(UserContext);

  useEffect(onLogout, []);

  return (
    <section className="container mx-auto flex flex-col items-center my-8">
      <h2 className="text-4xl font-medium">Wylogowano</h2>
    </section>
  );
};

export default Logout;
