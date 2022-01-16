import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const isLoggedIn = !!user;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default RequireAuth;
