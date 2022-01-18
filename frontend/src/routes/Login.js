import axios from "axios";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const { onLogin } = useContext(UserContext);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const onChange = (e) => {
    const target = e.target;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = document.querySelector("#error");
    error.textContent = "";

    axios
      .post("/api/user/login", formData)
      .then(({ data }) => {
        if (!data.user) {
          error.textContent = data.message;
        } else {
          onLogin(data.user);
        }
      })
      .catch((err) => {
        if (err.response) {
          error.textContent = err.response.data.message;
        } else {
          error.textContent = err.message;
        }
      });
  };

  return (
    <div>
      <section className="container mx-auto flex flex-col items-center my-8">
        <h1 className="text-4xl font-medium">Logowanie</h1>
        <form className="w-1/3" onSubmit={onSubmit}>
          <Input
            label="Login"
            name="login"
            type="text"
            placeholder="Twój login"
            value={formData.login}
            onChange={onChange}
          />
          <Input
            label="Hasło"
            name="password"
            type="password"
            placeholder="Twoje hasło"
            value={formData.password}
            onChange={onChange}
          />
          <span className="block text-lg text-red-500 my-8" id="error"></span>
          <div className="flex justify-between items-center">
            <Button label="Zaloguj" />
            <span className="block">
              Nie posiadasz konta?
              <Link to="/signup" className="block text-primary">
                Zarejestruj się
              </Link>
            </span>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
