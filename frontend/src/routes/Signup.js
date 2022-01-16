import axios from "axios";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

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
    const error = document.querySelector("#error");
    const success = document.querySelector("#success");
    error.textContent = "";
    success.textContent = "";

    if (formData.password !== formData.passwordRepeat) {
      error.textContent = "Passwords dont match!";
      return;
    }

    const { passwordRepeat: dummy, ...data } = formData;

    axios
      .post("/api/user/signup", data)
      .then(({ data }) => {
        success.textContent = "Successfully registered! You can now log in.";
      })
      .catch((err) => {
        error.textContent = err.response.data.message;
      });
  };

  return (
    <section className="container mx-auto flex flex-col items-center my-8">
      <h1 className="text-4xl font-medium">Rejestracja</h1>
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
          label="E-mail"
          name="email"
          type="email"
          placeholder="Your e-mail"
          value={formData.email}
          onChange={onChange}
          invalidMessage="Please provide a valid email address."
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Your password"
          value={formData.password}
          onChange={onChange}
          invalidMessage="Password should be atleast 6 characters long."
        />
        <Input
          label="Confirm password"
          name="passwordRepeat"
          type="password"
          placeholder="Your password"
          value={formData.passwordRepeat}
          onChange={onChange}
          invalidMessage="Passwords don't match."
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
        <span className="block text-lg text-red-500 mt-8" id="error"></span>
        <span className="block text-lg text-green-500 mt-8" id="success"></span>
        <Button label="Zarejestruj" />
      </form>
    </section>
  );
};

export default Signup;
