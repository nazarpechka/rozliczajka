import React from "react";

const UserContext = React.createContext({
  user: {},
  onLogin: (user) => {},
  onLogout: () => {},
  checkIfLoggedIn: () => {},
});

export default UserContext;
