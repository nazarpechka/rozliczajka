import { useState, useEffect, useContext } from "react";
import useRequest from "../hooks/useRequest";

import Section from "../components/Section";
import GroupCard from "../components/Groups/GroupCard";
import GroupCardMini from "../components/Groups/GroupCardMini";
import CreateGroupModal from "../components/Groups/CreateGroupModal";
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

  return groups ? (
    <Section
      title={
        user.isParticipant
          ? "Grupy, do których jesteś dodany"
          : "Grupy, kierowane przez ciebie"
      }
    >
      <div className="flex justify-start gap-6 items-center mb-8">
        <Button label="Zmienić wygląd" onClick={changeView} />
        {!user.isParticipant && (
          <CreateGroupModal onCreation={fetchGroups}>
            <Button label="Nowa grupa" />
          </CreateGroupModal>
        )}
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
    </Section>
  ) : (
    <Section title="Loading..." />
  );
};

export default Groups;
