import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';

const DeleteProduct = ({productId: id}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {user } = useContext(UserContext);
  const token = user?.token;

  useEffect(() => {
    if(!token) navigate('/login');
  }, []);

  const removeProduct = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status == 200) {
        if(location.pathname == `/myproducts/${user.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
      setIsLoading(false);
    } catch(err){
      console.log(err);
    }
  };

  if(isLoading) return <CircularProgress className='loader'/>;

  return (
    <Link className='btn sm danger' onClick={() => removeProduct(id)}>Eliminar</Link>
  )
}

export default DeleteProduct