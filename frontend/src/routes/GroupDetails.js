import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import Button from "../components/Button";

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [group, setGroup] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
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
        if (err.response) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage(err.message);
        }
      });
  }, [user.token, id]);

  const leaveGroup = () => {
    axios
      .delete(`/api/group/${id}/leave`, {
        headers: {
          "x-access-token": user.token,
        },
      })
      .then(() => {
        navigate("/groups");
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage(err.message);
        }
      });
  };

  if (!group) {
    return (
      <section className="container mx-auto my-8">
        <h1 className="text-4xl font-medium">
          {errorMessage ? errorMessage : "Loading..."}
        </h1>
      </section>
    );
  }

  return (
    <section className="container mx-auto my-8">
      <h1 className="text-4xl font-medium mb-8">{group.name}</h1>
      <div className="py-2">
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
    </section>
  );
};

export default GroupDetails;
