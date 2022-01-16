import axios from "axios";
import { useState, useEffect, useContext } from "react";

import GroupCard from "../components/GroupCard";
import UserContext from "../contexts/UserContext";

const Groups = () => {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);

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

  return (
    <div>
      <h1 className="container mx-auto text-4xl font-medium mb-11 mt-10">
        Grupy, do których jesteś dodany
      </h1>
      {groups.map((group) => (
        <GroupCard
          key={group._id}
          name={group.name}
          creationDate={group.creationDate}
          manager={group.manager}
          participants={group.participants}
        />
      ))}
    </div>
  );
};

export default Groups;
