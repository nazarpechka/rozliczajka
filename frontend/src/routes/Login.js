import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  return (
    <div>
      <Nav className="shadow-md shadow-orange-500/25" />
      <section className="container mx-auto my-8 flex flex-col items-center px-96">
        <h1 className="text-4xl font-medium mb-11 mt-10">Logowanie</h1>
        <form className="w-full">
          <Input
            label="Login"
            name="login"
            type="text"
            placeholder="Your login"
          />
          <Input
            label="Password"
            name="password"
            type="text"
            placeholder="Your password"
          />
          <Button label="Zaloguj" />
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
