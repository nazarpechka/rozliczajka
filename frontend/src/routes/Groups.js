import { useState, useEffect, useContext } from "react";
import useRequest from "../hooks/useRequest";

import GroupCard from "../components/Groups/GroupCard";
import GroupCardMini from "../components/Groups/GroupCardMini";
import Button from "../components/Button";
import UserContext from "../contexts/UserContext";
import AlertContext from "../contexts/AlertContext";

const Groups = () => {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [miniView, setMiniView] = useState(true);
  const { onError } = useContext(AlertContext);
  const fetchGroups = useRequest(`/api/user/groups`, "GET", setGroups, onError);

  useEffect(() => {
    fetchGroups();
  }, []);

  const changeView = () => {
    setMiniView(!miniView);
  };

  if (!groups) {
    return (
      <section className="container mx-auto my-8">
        <h1 className="text-4xl font-medium">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-medium">
          {user.isParticipant
            ? "Grupy, do których jesteś dodany"
            : "Grupy, kierowane przez ciebie"}
        </h1>
        <Button label="Zmienić wygląd" onClick={changeView} />
      </div>

      {miniView ? (
        <div className="grid grid-cols-4 gap-6">
          {groups.map((group) => (
            <GroupCardMini key={group._id} group={group} />
          ))}
        </div>
      ) : (
        <div>
          {groups.map((group) => (
            <GroupCard key={group._id} group={group} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Groups;
