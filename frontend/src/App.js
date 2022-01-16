import { React, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const onLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/groups");
  };

  const onLogout = () => {
    setUser();
    localStorage.removeItem("user");
    navigate("/");
  };

  const value = {
    user,
    onLogin,
    onLogout,
  };

  return (
    <UserContext.Provider value={value}>
      <div className="h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="/confirmations" element={<Confirmations />} />
            <Route path="*" status={404} element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default App;
