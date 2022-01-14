import axios from "axios";
import React from "react";

import Nav from "../components/Nav";
import GroupCard from "../components/GroupCard";

const Groups = () => {
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    const userId = "61dc8d259f101ba1de7793d5";
    axios.get(`http://localhost:3001/user/${userId}/groups`)
      .then(({ data }) => {
        setGroups(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Nav isUserLoggedIn={true} className="shadow-md shadow-orange-500/25" />
      <h1 className="container mx-auto text-4xl font-medium mb-11 mt-10">Grupy, do których jesteś dodany</h1>
      {groups.map(group => (
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
