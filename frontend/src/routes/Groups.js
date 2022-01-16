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
    <section className="container mx-auto my-8">
      <h1 className="text-4xl font-medium">Grupy, do których jesteś dodany</h1>
      {groups.map((group) => (
        <GroupCard key={group._id} group={group} />
      ))}
    </section>
  );
};

export default Groups;
