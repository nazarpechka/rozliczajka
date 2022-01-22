import { Link } from "react-router-dom";

import icon from "../../assets/arrow-right.png";

const GroupCard = ({ group }) => {
  return (
    <div className="container mx-auto rounded-md shadow-md p-5 mb-11 relative overflow-hidden">
      {!group.isActive && (
        <div className="w-full h-full absolute top-0 right-0 z-10 bg-gray-900 bg-opacity-25 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
            <path
              fillRule="evenodd"
              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
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
