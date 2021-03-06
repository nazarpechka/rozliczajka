import { Link } from "react-router-dom";

import icon from "../../assets/arrow-right.png";

const icons = {
  manager: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  ),
  participants: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  ),
  creationDate: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
        clipRule="evenodd"
      />
    </svg>
  ),
};
const GroupCardMini = ({ group }) => {
  return (
    <div className="rounded-md shadow-md p-5 flex flex-col gap-2 justify-between relative overflow-hidden">
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
      <h3 className="text-2xl font-medium">{group.name}</h3>
      <span className="text-lg text-slate-700">
        {icons.creationDate}{" "}
        {new Date(group.creationDate).toLocaleDateString().replaceAll(".", "/")}
      </span>
      <span className="text-lg text-slate-700">
        {icons.manager} {group.manager.name} {group.manager.surname}
      </span>
      <span className="text-lg text-slate-700">
        {icons.participants} {group.participants.length} uczestnik??w
      </span>

      <Link
        to={`/group/${group._id}/details`}
        className="flex items-center gap-6 hover:opacity-60 ease-in-out duration-200"
      >
        <span className="text-xl">przejd?? do grupy</span>
        <img className="w-10" src={icon} alt="" />
      </Link>
    </div>
  );
};

export default GroupCardMini;
