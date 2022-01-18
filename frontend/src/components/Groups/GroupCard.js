import { Link } from "react-router-dom";

import icon from "../../assets/arrow-right.png";

const GroupCard = ({ group }) => {
  return (
    <div className="container mx-auto rounded-md shadow-md p-5 mb-11">
      <div className="flex justify-between mb-12">
        <h3 className="text-xl font-medium">{group.name}</h3>
        <span className="text-sm font-light">
          data utworzenia grupy{" "}
          {new Date(group.creationDate)
            .toLocaleDateString()
            .replaceAll(".", "/")}
        </span>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3 flex justify-between">
          <span className="text-lg">
            kierownik: {group.manager.name} {group.manager.surname}
          </span>
          <span className="text-lg">
            liczba uczestników: {group.participants.length}
          </span>
        </div>
        <Link
          to={`/group/${group._id}/details`}
          className="flex items-center gap-6 hover:opacity-60 ease-in-out duration-200"
        >
          <span className="text-xl">przejdź do grupy</span>
          <img className="w-10" src={icon} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default GroupCard;
