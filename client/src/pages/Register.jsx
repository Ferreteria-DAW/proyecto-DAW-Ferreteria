import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser) {
        setError('Registro fallido, inténtalo de nuevo');
      }
      navigate('/login');
    } catch(err) {
      console.log(err.response.data.message)
      setError(err.response.data.message);
    }
  }
  return (
    <section className='register'>
      <div className="container">
        <h2>Registrarse</h2>
        <form action="" className="form-register__form" onSubmit={registerUser}>
         {error && <p className="form__error-message">{error}</p>}
          <input type="text" name="username"  placeholder='Nombre completo' value={userData.username} onChange={changeInputHandler} autoFocus/>
          <input type="email" name="email"  placeholder='Email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" name="password"  placeholder='contraseña' value={userData.password} onChange={changeInputHandler} />
          <input type="password" name="confirmPassword"  placeholder='Confirmar contraseña' value={userData.confirmPassword} onChange={changeInputHandler} />
          <button type="submit" className='btn primary'>Registrarse</button>
        </form>
        <small>¿Ya tienes una cuenta? <Link to={`/login`}>iniciar sesión</Link> </small>
      </div>     
    </section>
  )
}

export default Register