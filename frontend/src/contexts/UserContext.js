import React from "react";

const UserContext = React.createContext({
  user: {},
  onLogin: () => {},
  onLogout: () => {},
});

export default UserContext;
