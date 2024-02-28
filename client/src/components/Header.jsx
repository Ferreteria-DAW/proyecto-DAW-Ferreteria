import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from '@mui/material/Avatar';

import axios from "axios";

import { UserContext } from "../context/userContext";

const Header = () => {
 
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 768);

  const { user } = useContext(UserContext);
  const rol = user ? user.rol : "";

  const [avatar, setAvatar] = useState(""); // Nuevo estado para el avatar

  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${user.id}`,
          { withCredentials: true, headers: { Authorization: `Bearer ${user.token}` } }
        );
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    if (user) {
      fetchAvatar();
    }
  }, [user]); // Llamar a fetchAvatar cuando cambie el usuario

  const navHandler = () => {
    setIsNavShowing(!isNavShowing);
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav_logo" onClick={navHandler}>
          <img src="" alt="Logo" />
        </Link>
      
        {isNavShowing && ( // Mostrar el menú solo si isNavShowing es true
          <ul className="nav__menu">
            {user ? ( // Usuario autenticado
              <>
                <Avatar className="mui-avatar" alt={user.username} src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} />
                <li onClick={navHandler}>
                  <Link to={`/profile/${user.id}`}>
                    {user.rol === "admin" ? "admin" : user?.username}
                  </Link>
                </li>
                {rol === "admin" && (
                  <li onClick={navHandler}>
                    <Link to="/create">Crear Producto</Link>
                  </li>
                )}
                <li onClick={navHandler}>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : ( // Usuario no autenticado
              <>
                <li onClick={navHandler}>
                  <Link to="/login">Iniciar sesión</Link>
                </li>
                <li onClick={navHandler}>
                  <Link to="/register">Registro</Link>
                </li>
              </>
            )}
          </ul>
        )}

        <button
          className="nav__toggle-btn"
          onClick={navHandler} // Toggle de isNavShowing en lugar de cambiarlo directamente
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
