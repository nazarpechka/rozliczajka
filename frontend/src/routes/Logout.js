import { useEffect } from "react";

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, []);

  return (
    <section className="container mx-auto flex justify-center py-8">
      <h2 className="text-4xl font-bold">Logged out</h2>
    </section>
  );
};

export default Logout;
