import axios from "axios";
import { useState, useEffect } from "react";

import Nav from "../components/Nav";
import GroupCard from "../components/GroupCard";

const Groups = ({ user }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/groups`, {
        headers: {
          'x-access-token': user.token
        }
      })
      .then(({ data }) => {
        setGroups(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Nav isLoggedIn={user} className="shadow-md shadow-orange-500/25" />
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
