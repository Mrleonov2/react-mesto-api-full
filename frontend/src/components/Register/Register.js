import React, { useState } from "react";
import "./Register.css";
import { withRouter } from "react-router-dom";
function Register({ onRegister }) {
  const [registerValue, setRegisterValue] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setRegisterValue({ ...registerValue, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!registerValue.password || !registerValue.email) {
      return;
    }
    onRegister(registerValue.password, registerValue.email)
  }
  return (
    <div className="register">
      <form
        className="register__form"
        onSubmit={handleSubmit}
      >
        <h2 className="register__heading">Регистрация</h2>
        <input
          id="email"
          className="register__input"
          placeholder="Email"
          type="email"
          value={registerValue.email}
          name="email"
          onChange={handleChange}
        ></input>
        <input
          id="password"
          className="register__input"
          placeholder="Пароль"
          type="password"
          value={registerValue.password}
          name="password"
          onChange={handleChange}
        ></input>
        <button className="register__submit" type="submit">
          Зарегистрироваться
        </button>
        <p>Уже зарегистрированы? Войти</p>
      </form>
    </div>
  );
}
export default Register;
