import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import UserContext from "../contexts/UserContext";

const DetailedInfo = () => {
  const { id } = useParams();
  const { user } = React.useContext(UserContext);
  const [group, setGroup] = React.useState([]);

  React.useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:4000/group/${id}`, {
        headers: {
          "x-access-token": user.token,
        },
      })
      .then(({ data }) => {
        setGroup(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={user} className="shadow-md shadow-orange-500/25" />
      <h1 className="container mx-auto text-4xl font-medium mb-11 mt-10">Podróż do Berlina - seniory Wrocławia 12.11.2021 - 14.11.2021</h1>
      <div className="container mx-auto shadow-md shadow-orange-500/25 py-2">
        {JSON.stringify(group)}
        <div className="container mx-auto flex justify-between text-2xl font-medium mb-6">
          <span>Data utworzenia: 12.11.2021</span>
          <span>Status: aktywna</span>
        </div>
        <span className="container mx-auto flex text-2xl font-medium mb-6">Kierownik: Anna Nowak</span>
      </div>
      <div className="container mx-auto flex text-2xl mb-6 pt-6">
        Opis wycieczki: Wspaniała wycieczka dla seniorów z Wroclawia, zorganizowana przez Wrocławskie
        stowarzyszenie seniorów. Niezapomniane wrażenia i emocje, gwarantowane każdemu, kto podejmie
        to wyzwanie i wyruszy z nami w podróż. 
      </div>
      <span className="container mx-auto flex text-2xl font-medium">Lista uczestników:</span>
      <div className="container mx-auto flex text-2xl mt-5 py-6 pl-3 shadow-inner shadow-orange-500/25">
        <ul>
          <li>1. Anna Zawadzka</li>
          <li>2. Artur Nowak</li>
          <li>3. Zofia Mickiewicz</li>
          <li>4. Anton Szachtan</li>
          <li>5. Andrzej WItek</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailedInfo;
