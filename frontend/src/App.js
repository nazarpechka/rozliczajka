import { React, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorAlert from "./components/ErrorAlert";
import SuccessAlert from "./components/SuccessAlert";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Groups from "./routes/Groups";
import NotFound from "./routes/NotFound";
import Expenses from "./routes/Expenses";
import Debts from "./routes/Debts";
import Confirmations from "./routes/Confirmations";
import UserContext from "./contexts/UserContext";
import AlertContext from "./contexts/AlertContext";
import RequireAuth from "./routes/RequireAuth";
import GroupDetails from "./routes/GroupDetails";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);
  const navigate = useNavigate();

  // Alert Context
  const onError = (message) => {
    setErrors([...errors, message]);
  };

  const onSuccess = (message) => {
    setSuccesses([...successes, message]);
  };

  const clearAll = () => {
    setErrors([]);
    setSuccesses([]);
  };

  const alertValue = {
    errors,
    successes,
    onError,
    onSuccess,
    clearAll,
  };

  // User Context
  const onLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    clearAll();
    navigate("/groups");
  };

  const onLogout = () => {
    setUser();
    localStorage.removeItem("user");
    clearAll();
    navigate("/");
  };

  const userValue = {
    user,
    onLogin,
    onLogout,
  };

  return (
    <UserContext.Provider value={userValue}>
      <AlertContext.Provider value={alertValue}>
        <div className="h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex flex-col justify-between">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/logout"
                element={
                  <RequireAuth>
                    <Logout />
                  </RequireAuth>
                }
              />
              <Route
                path="/groups"
                element={
                  <RequireAuth>
                    <Groups />
                  </RequireAuth>
                }
              />
              <Route
                path="/expenses"
                element={
                  <RequireAuth>
                    <Expenses />
                  </RequireAuth>
                }
              />
              <Route
                path="/debts"
                element={
                  <RequireAuth>
                    <Debts />
                  </RequireAuth>
                }
              />
              <Route
                path="/confirmations"
                element={
                  <RequireAuth>
                    <Confirmations />
                  </RequireAuth>
                }
              />
              <Route
                path="/group/:id/details"
                element={
                  <RequireAuth>
                    <GroupDetails />
                  </RequireAuth>
                }
              />
              <Route path="*" status={404} element={<NotFound />} />
            </Routes>
            <div>
              {errors.map((error, ind) => (
                <ErrorAlert key={ind} text={error} />
              ))}

              {successes.map((success, ind) => (
                <SuccessAlert key={ind} text={success} />
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </AlertContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
