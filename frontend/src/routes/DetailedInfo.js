import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import Button from "../components/Button";

const DetailedInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  const [group, setGroup] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/group/${id}`, {
        headers: {
          "x-access-token": user.token,
        },
      })
      .then(({ data }) => {
        setGroup(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token, id]);

  const leaveGroup = () => {
    axios
      .delete(`http://localhost:4000/api/group/${id}/leave-group`, {
        headers: {
          "x-access-token": user.token,
        },
      })
      .then(({ data }) => {
        setGroup(data);
        navigate("/groups");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!group) {
    return null;
  }

  return (
    <div>
      <h1 className="container mx-auto text-4xl font-medium mb-11 mt-10">
        {group.name}
      </h1>
      <div className="container mx-auto py-2">
        <div className="flex justify-between text-2xl mb-6">
          <span>
            <span className="font-medium">Data utworzenia:</span>{" "}
            {new Date(group.creationDate)
              .toLocaleDateString()
              .replaceAll(".", "/")}
          </span>
          <span>
            Status:{" "}
            {group.isActive ? (
              <span className="text-emerald-500">Aktywna</span>
            ) : (
              "Nie aktywna"
            )}
          </span>
        </div>
        <span className="text-2xl">
          <span className="font-medium">Kierownik</span>: {group.manager.name}{" "}
          {group.manager.surname}
        </span>
      </div>
      <div className="container mx-auto border-y border-primary/50 py-4 flex my-4">
        <span className="text-2xl">
          <span className="font-medium">Opis wycieczki:</span>{" "}
          {group.description}
        </span>
      </div>
      <span className="container mx-auto flex text-2xl font-medium">
        Lista uczestników:
      </span>
      <div className="container mx-auto flex text-2xl mt-5 p-5 border border-primary/50 rounded-md max-h-72 overflow-auto">
        <ul>
          {group.participants.map((participant, index) => (
            <li key={participant._id}>
              {index + 1}. {participant.name} {participant.surname} -{" "}
              {participant.email}{" "}
              {participant.city ? `, ${participant.city}` : ``}
            </li>
          ))}
        </ul>
      </div>
      <div className="container mx-auto mt-8 flex">
        <Button label="Opuść grupę" onClick={leaveGroup} />
      </div>
    </div>
  );
};

export default DetailedInfo;
