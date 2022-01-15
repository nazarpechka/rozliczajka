import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Groups from "./routes/Groups";
import NotFound from "./routes/NotFound";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user") || {});
  const navigate = useNavigate();

  const onLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", user);
    navigate("/my-groups");
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
          <Route path="/my-groups" element={<Groups user={user} />} />
          <Route path="*" status={404} element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
