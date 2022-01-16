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

    console.log(formData);
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
        error.textContent = err.response.data.message;
      });
  };

  return (
    <div>
      <section className="container mx-auto flex flex-col items-center my-8">
        <h1 className="text-4xl font-medium">Logowanie</h1>
        <form className="w-1/2" onSubmit={onSubmit}>
          <Input
            label="Login"
            name="login"
            type="text"
            placeholder="Your login"
            value={formData.login}
            onChange={onChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Your password"
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
