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
      <section className="container mx-auto my-8 flex flex-col items-center px-96">
        <h1 className="text-4xl font-medium mb-11 mt-10">Logowanie</h1>
        <form className="w-full" onSubmit={onSubmit}>
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
          <span className="block text-lg text-red-500" id="error"></span>
          <Button label="Zaloguj" />
          <span className="block mt-4">
            Nie posiadasz konta?
            <Link to="/signup" className="text-primary">
              Zarejestruj się
            </Link>
          </span>
        </form>
      </section>
    </div>
  );
};

export default Login;
