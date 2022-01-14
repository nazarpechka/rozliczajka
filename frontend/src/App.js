import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Groups from "./routes/Groups";
import NotFound from "./routes/NotFound";

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-groups" element={<Groups />} />
        <Route path="*" status={404} element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
