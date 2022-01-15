import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/logout" element={<Logout onLogout={onLogout} />} />
          <Route path="/groups" element={<Groups user={user} />} />
          <Route path="/expenses" element={<Expenses user={user} />} />
          <Route path="/debts" element={<Debts user={user} />} />
          <Route
            path="/confirmations"
            element={<Confirmations user={user} />}
          />
          <Route path="*" status={404} element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
