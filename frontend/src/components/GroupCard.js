import { Link } from "react-router-dom";

import icon from "../assets/arrow-right.png";

const GroupCard = (props) => {
  return (
    <div className="container mx-auto rounded-md shadow-md p-5 mb-11">
      <div className="flex justify-between pb-12">
        <h3 className="text-xl font-medium">{props.name}</h3>
        <span className="text-sm font-light">data utworzenia grupy {new Date(props.creationDate).toLocaleDateString().replaceAll('.', '/')}</span>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3 flex justify-between">
          <span className="text-lg font-normal">kierownik: {props.manager.name} {props.manager.surname}</span>
          <span className="text-lg font-normal">liczba uczestników: {props.participants.length}</span>
        </div>
        <Link to="/" className="flex items-center hover:opacity-60 ease-in-out duration-200">
          <span className="text-xl mr-6 font-normal">przejdź do grupy</span>
          <img className="w-10" src={icon} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default GroupCard;
