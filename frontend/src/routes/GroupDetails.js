import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import Button from "../components/Button";
import Select from "../components/Select";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [group, setGroup] = useState();
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);

  // For managers only
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();

  const fetchUsers = () => {
    if (user.isParticipant || !group) {
      return;
    }
    axios
      .get("/api/user/list", {
        headers: {
          "x-access-token": user.token,
        },
      })
      .then(({ data }) => {
        const participants = group.participants.map(
          (participant) => participant._id
        );
        const filteredUsers = data.filter(
          (user) => user.isParticipant && !participants.includes(user._id)
        );

        if (filteredUsers.length) {
          setUsers(filteredUsers);
          setUserId(filteredUsers[0]._id);
        }
      })
      .catch((err) => {
        if (err.response) {
          setErrors([...errors, err.response.data.message]);
        } else {
          setErrors([...errors, err.message]);
        }
      });
  };

  const fetchDetails = () => {
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
          setErrors([...errors, err.response.data.message]);
        } else {
          setErrors([...errors, err.message]);
        }
      });
  };

  useEffect(fetchDetails, []);
  useEffect(fetchUsers, [group]);

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
          setErrors([...errors, err.response.data.message]);
        } else {
          setErrors([...errors, err.message]);
        }
      });
  };

  const addUser = (e) => {
    e.preventDefault();
    axios
      .post(
        `/api/group/${id}/addUser`,
        { userId },
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      )
      .then(() => {
        fetchDetails();
        setSuccesses([...successes, `Dodałes uczestnika ${userId}`]);
      })
      .catch((err) => {
        if (err.response) {
          setErrors([...errors, err.response.data.message]);
        } else {
          setErrors([...errors, err.message]);
        }
      });
  };

  const removeUser = (userId) => {
    axios
      .delete(`/api/group/${id}/removeUser`, {
        data: { userId },
        headers: {
          "x-access-token": user.token,
        },
      })
      .then(() => {
        fetchDetails();
        setSuccesses([...successes, `Usuniełeś uczestnika ${userId}`]);
      })
      .catch((err) => {
        if (err.response) {
          setErrors([...errors, err.response.data.message]);
        } else {
          setErrors([...errors, err.message]);
        }
      });
  };

  if (!group) {
    return (
      <section className="container mx-auto my-8">
        {errors.map((error) => (
          <ErrorAlert text={error} />
        ))}
        <h1 className="text-4xl font-medium">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="container mx-auto my-8">
      {errors.map((error) => (
        <ErrorAlert text={error} />
      ))}

      {successes.map((success) => (
        <SuccessAlert text={success} />
      ))}

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block hover:text-red-500 hover:cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => {
                  removeUser(participant._id);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          ))}
        </ul>
      </div>
      {user.isParticipant && (
        <div className="container mx-auto mt-8 flex">
          <Button label="Opuść grupę" onClick={leaveGroup} />
        </div>
      )}
      {!user.isParticipant && (
        <div className="container mx-auto mt-8 flex">
          <form onSubmit={addUser}>
            <Select
              label="Uczestnik"
              name="user"
              options={users}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button label="Dodaj uczestnika" />
          </form>
        </div>
      )}
    </section>
  );
};

export default GroupDetails;
