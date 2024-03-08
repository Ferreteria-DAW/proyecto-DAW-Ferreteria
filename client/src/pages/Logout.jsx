import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Logout = () => {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  setUser(null);
  navigate('/login');
  
  return null; // No necesitas retornar ningún elemento ya que este componente no renderiza nada.
}

export default Logout;
