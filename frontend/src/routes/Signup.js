import Input from "../components/Input";
import Button from "../components/Button";

const Signup = () => {
  return (
    <div>
      <section className="container mx-auto my-8 flex flex-col items-center px-96">
        <h1 className="text-4xl font-medium mb-11 mt-10">Rejestracja</h1>
        <form className="w-full">
          <Input
            label="Login"
            name="login"
            type="text"
            placeholder="Your login"
          />
          <Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="Your e-mail"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Your password"
          />
          <Input
            label="Repeat password"
            name="passwordRepeat"
            type="password"
            placeholder="Repeat password"
          />
          <Input label="Imie" name="name" type="text" placeholder="Imie" />
          <Input
            label="Nazwisko"
            name="surname"
            type="text"
            placeholder="Nazwisko"
          />
          <Input
            label="Data urodzenia"
            name="birthDate"
            type="date"
            value={new Date()}
          />
          <Button label="Zarejestruj" />
        </form>
      </section>
    </div>
  );
};

export default Signup;
