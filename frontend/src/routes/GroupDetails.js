import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";

import UserContext from "../contexts/UserContext";
import AlertContext from "../contexts/AlertContext";
import Section from "../components/Section";
import Button from "../components/Button";
import Select from "../components/Select";
import ConfirmModal from "../components/ConfirmModal";

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { onError, onSuccess } = useContext(AlertContext);
  const [group, setGroup] = useState();

  // For managers only
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();

  // Requests
  const fetchDetails = useRequest(`/api/group/${id}`, "GET", setGroup, onError);
  const fetchUsers = useRequest(
    "/api/user/list",
    "GET",
    (users) => {
      const participants = group.participants.map(
        (participant) => participant._id
      );
      const filteredUsers = users.filter(
        (user) => user.isParticipant && !participants.includes(user._id)
      );

      if (filteredUsers.length) {
        setUsers(filteredUsers);
        setUserId(filteredUsers[0]._id);
      } else {
        setUserId("");
      }
    },
    onError
  );
  const leaveGroup = useRequest(
    `/api/group/${id}/leave`,
    "DELETE",
    () => {
      navigate("/groups");
      onSuccess(`Opuściłeś grupę ${group.name}`);
    },
    onError
  );
  const addUser = useRequest(
    `/api/group/${id}/addUser`,
    "POST",
    () => {
      fetchDetails();
      onSuccess(`Dodałes uczestnika ${userId}`);
    },
    onError
  );
  const removeUser = useRequest(
    `/api/group/${id}/removeUser`,
    "DELETE",
    () => {
      fetchDetails();
      onSuccess(`Usuniełeś uczestnika ${userId}`);
    },
    onError
  );
  const deactivateGroup = useRequest(
    `/api/group/${id}`,
    "DELETE",
    () => {
      fetchDetails();
      onSuccess(`Deaktyowałeś grupę ${group.name}`);
    },
    onError
  );

  useEffect(fetchDetails, []);
  useEffect(() => {
    if (user.isParticipant || !group) {
      return;
    }
    fetchUsers();
  }, [group]);

  return group ? (
    <Section title={group.name}>
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
      <div className="border-y border-primary/50 py-4 flex my-4">
        <span className="text-2xl">
          <span className="font-medium">Opis wycieczki:</span>{" "}
          {group.description}
        </span>
      </div>
      <span className="flex text-2xl font-medium">Lista uczestników:</span>
      <div className="flex text-2xl mt-5 p-5 border border-primary/50 rounded-md max-h-72 overflow-auto">
        <ul>
          {group.participants.map((participant, index) => (
            <li key={participant._id}>
              {index + 1}. {participant.name} {participant.surname} -{" "}
              {participant.email}{" "}
              {participant.city ? `, ${participant.city}` : ``}
              {!user.isParticipant && (
                <ConfirmModal
                  title="Usunąć uczestnika?"
                  text={`Czy na pewno chcesz usunąć uczestnika ${
                    participant.name + " " + participant.surname
                  }?`}
                  onConfirm={() => {
                    removeUser({ userId: participant._id });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block hover:text-red-500 hover:cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </ConfirmModal>
              )}
            </li>
          ))}
        </ul>
      </div>
      {user.isParticipant ? (
        <ConfirmModal
          title="Opuścić grupę?"
          text="Czy na pewno chcesz opuścić grupę?"
          onConfirm={leaveGroup}
        >
          <Button className="mt-4" label="Opuść grupę" />
        </ConfirmModal>
      ) : (
        <div className="flex justify-between items-end mt-8">
          <div className="flex">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addUser({ userId });
              }}
            >
              <div className="inline-block">
                <Select
                  label="Uczestnik"
                  name="user"
                  options={users.map(({ _id, name, surname }) => {
                    return { key: _id, val: name + " " + surname };
                  })}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <Button label="Dodaj uczestnika" />
            </form>
          </div>
          <ConfirmModal
            title="Deaktywować grupę?"
            text="Czy na pewno chcesz deaktywować grupę?"
            onConfirm={deactivateGroup}
          >
            <Button label="Deaktywuj grupę" />
          </ConfirmModal>
        </div>
      )}
    </Section>
  ) : (
    <Section title="Loading..." />
  );
};

export default GroupDetails;
