import { useState, useContext } from "react";
import useRequest from "../hooks/useRequest";

import Section from "../components/Section";
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
      target.setCustomValidity(target.value.length < 6 ? "invalid" : "");
    } else if (target.name === "passwordRepeat") {
      target.setCustomValidity(
        target.value !== formData.password ? "invalid" : ""
      );
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
    <Section title="Rejestracja" className="flex flex-col items-center my-8">
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
    </Section>
  );
};

export default Signup;
