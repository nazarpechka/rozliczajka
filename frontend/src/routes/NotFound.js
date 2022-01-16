import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container mx-auto flex flex-col gap-6 items-center my-8">
      <h2 className="text-4xl font-medium mb-8">Strona nie znaleziona!</h2>
      <NavLink to="/" className="text-lg hover:text-primary">
        Powrót na główną
      </NavLink>
    </section>
  );
};

export default NotFound;
