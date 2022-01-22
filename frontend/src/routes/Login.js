import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useRequest from "../hooks/useRequest";

import Input from "../components/Input";
import Button from "../components/Button";
import UserContext from "../contexts/UserContext";
import AlertContext from "../contexts/AlertContext";

const Login = () => {
  const { onLogin } = useContext(UserContext);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const { onError } = useContext(AlertContext);
  const login = useRequest("/api/user/login", "POST", onLogin, onError);

  const onChange = (e) => {
    const target = e.target;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <section className="container mx-auto flex flex-col items-center my-8">
        <h1 className="text-4xl font-medium">Logowanie</h1>
        <form
          className="w-1/3"
          onSubmit={(e) => {
            e.preventDefault();
            login(formData);
          }}
        >
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
          <div className="flex justify-between items-center my-4">
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
