import { useState, useContext } from "react";
import useRequest from "../hooks/useRequest";

import Input from "../components/Input";
import Button from "../components/Button";

import AlertContext from "../contexts/AlertContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    passwordRepeat: "",
    name: "",
    surname: "",
    birthDate: new Date().toISOString().substr(0, 10),
  });

  const { onError, onSuccess } = useContext(AlertContext);
  const signup = useRequest(
    "/api/user/signup",
    "POST",
    () => onSuccess("Pomyślnie zarejestrowano! Teraz możesz zalogować się."),
    onError
  );

  const validate = (target) => {
    if (target.name === "password") {
      if (target.value.length < 6) {
        target.setCustomValidity("invalid");
      } else {
        target.setCustomValidity("");
      }
    } else if (target.name === "passwordRepeat") {
      if (target.value !== formData.password) {
        target.setCustomValidity("invalid");
      } else {
        target.setCustomValidity("");
      }
    }
  };

  const onChange = (e) => {
    const target = e.target;
    validate(target);

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordRepeat) {
      onError("Hasła nie są takie same!");
      return;
    }

    const { passwordRepeat: dummy, ...data } = formData;

    signup(data);
  };

  return (
    <section className="container mx-auto flex flex-col items-center my-8">
      <h1 className="text-4xl font-medium">Rejestracja</h1>
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
          label="E-mail"
          name="email"
          type="email"
          placeholder="Twój email"
          value={formData.email}
          onChange={onChange}
          invalidMessage="Podaj prawidłowy adres email."
        />
        <Input
          label="Hasło"
          name="password"
          type="password"
          placeholder="Twoje hasło"
          value={formData.password}
          onChange={onChange}
          invalidMessage="Hasło musi być dłuższe od 6 symbolów."
        />
        <Input
          label="Potwierdż hasło"
          name="passwordRepeat"
          type="password"
          placeholder="Hasło ponownie"
          value={formData.passwordRepeat}
          onChange={onChange}
          invalidMessage="Hasła nie są takie same."
        />
        <Input
          label="Imie"
          name="name"
          type="text"
          placeholder="Imie"
          value={formData.name}
          onChange={onChange}
        />
        <Input
          label="Nazwisko"
          name="surname"
          type="text"
          placeholder="Nazwisko"
          value={formData.surname}
          onChange={onChange}
        />
        <Input
          label="Data urodzenia"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={onChange}
        />
        <Button className="my-4" label="Zarejestruj" />
      </form>
    </section>
  );
};

export default Signup;
