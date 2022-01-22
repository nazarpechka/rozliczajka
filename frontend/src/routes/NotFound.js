import { NavLink } from "react-router-dom";

import Section from "../components/Section";

const NotFound = () => {
  return (
    <Section
      title="Strona nie znaleziona!"
      className="flex flex-col gap-6 items-center my-8"
    >
      <NavLink to="/" className="text-lg hover:text-primary">
        Powrót na główną
      </NavLink>
    </Section>
  );
};

export default NotFound;
