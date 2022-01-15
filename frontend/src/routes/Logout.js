import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

const Logout = () => {
  const { onLogout } = useContext(UserContext);

  useEffect(onLogout, []);

  return (
    <section className="container mx-auto flex justify-center py-8">
      <h2 className="text-4xl font-bold">Logged out</h2>
    </section>
  );
};

export default Logout;
