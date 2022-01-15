import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = ({ onLogin }) => {
  const login = useRef();
  const password = useRef();

  const onClick = async (e) => {
    const error = document.querySelector("#error");
    const data = {
      login: login.current.value,
      password: password.current.value,
    };

    axios
      .post("http://localhost:4000/user/login", data)
      .then(({ data }) => {
        if (!data.user) {
          error.textContent = data.message;
        } else {
          error.textContent = "";
          onLogin(data.user);
        }
      })
      .catch((err) => {
        error.textContent = err.response.data.message;
      });
  };

  return (
    <div>
      <Nav className="shadow-md shadow-orange-500/25" />
      <section className="container mx-auto my-8 flex flex-col items-center px-96">
        <h1 className="text-4xl font-medium mb-11 mt-10">Logowanie</h1>
        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Login"
            name="login"
            type="text"
            placeholder="Your login"
            innerRef={login}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Your password"
            innerRef={password}
          />
          <span className="block text-lg text-red-500" id="error"></span>
          <Button label="Zaloguj" onClick={onClick} />
          <span className="block mt-4">
            Nie posiadasz konta?{" "}
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
