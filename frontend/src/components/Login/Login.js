import React, { useState } from "react";
import "./Login.css";
import { withRouter } from "react-router-dom";
function Login({ onLogin }) {
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!loginValue.password || !loginValue.email) {
      return;
    }
    onLogin(loginValue.password, loginValue.email)
  }

  return (
    <div className="login">
      <form
        className="login__form"
        
        onSubmit={handleSubmit}
      >
        <h2 className="login__heading">Вход</h2>
        <input
          id="email"
          className="login__input"
          placeholder="Email"
          type="email"
          value={loginValue.email}
          name="email"
          onChange={handleChange}
        ></input>
        <input
          id="password"
          className="login__input"
          placeholder="Пароль"
          type="password"
          value={loginValue.password}
          name="password"
          onChange={handleChange}
        ></input>
        <button className="login__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
