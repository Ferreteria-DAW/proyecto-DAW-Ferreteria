import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {UserContext} from '../context/userContext';
import PasswordStrength from "../components/passwordStrength";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setUser(user);
      navigate('/');
    } catch(err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Inicio de sesión</h2>
        <form action="" className="form-login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
            autoComplete='email'
          />
          {/* <input
            type="password"
            name="password"
            placeholder="contraseña"
            value={userData.password}
            onChange={changeInputHandler}
            autoComplete='current-password'
          /> */}
           <PasswordStrength name={'password'} value={userData.password} placeholder={'Contraseña'} onChange={(value) => setUserData(prevState => ({...prevState, password: value}))} />
          <button type="submit" className="btn primary">
            Iniciar sesión
          </button>
        </form>
        <small>
          ¿Aún no tienes una cuenta? <Link to={`/register`}>sign up</Link>{" "}
        </small>
      </div>
    </section>
  );
};

export default Login;
