import axios from "axios";
import { useState, useEffect, useContext } from "react";

import GroupCard from "../components/Groups/GroupCard";
import GroupCardMini from "../components/Groups/GroupCardMini";
import Button from "../components/Button";
import UserContext from "../contexts/UserContext";

const Groups = () => {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [miniView, setMiniView] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/user/groups`, {
        headers: {
          "x-access-token": user.token,
        },
      })
      .then(({ data }) => {
        setGroups(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token]);

  const changeView = () => {
    setMiniView(!miniView);
  };

  return (
    <section className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-medium">
          Grupy, do których jesteś dodany
        </h1>
        <Button label="Change view" onClick={changeView} />
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
