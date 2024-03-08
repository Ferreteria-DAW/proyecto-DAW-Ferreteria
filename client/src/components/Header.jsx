import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from '@mui/material/Avatar';
import logo from "../images/toolstore/logoFerreteria.png";
import { FaRegSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";

 
import axios from "axios";
 
import { UserContext } from "../context/userContext";
 
const Header = () => {
 
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 1135);
  const [isBurgerActive, setIsBurgerActive] = useState(false)
  console.log(isNavShowing)
  const { user } = useContext(UserContext);
  const rol = user ? user.rol : "";
 
  const [avatar, setAvatar] = useState(""); // Nuevo estado para el avatar
  const [isDarkMode, setIsDarkMode] = useState(false);
 
  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 1135);
    };
    console.log(isNavShowing)
 
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

  const toggleDarkMode = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark');
    setIsDarkMode(prevMode => !prevMode);
  };
 
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/">
          <img src={logo} alt="Logo"  className="logo"/>
        </Link>
     
        {isNavShowing && ( // Mostrar el menú solo si isNavShowing es true
          <ul className="nav__menu">
            {user ? ( // Usuario autenticado
              <>
                <Avatar className="mui-avatar" alt={user.username} src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} />
                <li>
                  <Link to={`/profile/${user.id}`}  onClick={() => window.innerWidth <= 1135 && navHandler()}>
                    {user.rol === "admin" ? "admin" : user?.username}
                  </Link>
                </li>
                {rol === "admin" && (
                  <li>
                    <Link to="/create" onClick={() => window.innerWidth <= 1135 && navHandler()}>Crear Producto</Link>
                  </li>
                )}
                <li>
                  <Link to="/" onClick={() => window.innerWidth <= 1135 && navHandler()}>
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={() => window.innerWidth <= 1135 && navHandler()}>
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => window.innerWidth <= 1135 && navHandler()}>Sobre nosotros</Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => window.innerWidth <= 1135 && navHandler()}>Contacto</Link>
                </li>
                <li>
                  <Link to="/logout" onClick={() => window.innerWidth <= 1135 && navHandler()}>Logout</Link>
                </li>
               
              </>
            ) : ( // Usuario no autenticado
              <>  
                <li>
                  <Link to="/login" onClick={() => window.innerWidth <= 1135 && navHandler()}>Iniciar sesión</Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => window.innerWidth <= 1135 && navHandler()}>Registro</Link>
                </li>
              </>
            )}
              {!isDarkMode ? <FaRegSun className="switch-btn" onClick={toggleDarkMode} /> : <FaRegMoon className="switch-btn moon" onClick={toggleDarkMode}/>}
          </ul>
        )}
 
        <button
          className="nav__toggle-btn"
          onClick={() => {
            
            navHandler();
            setIsBurgerActive(!isBurgerActive);
            
          }} // Toggle de isNavShowing en lugar de cambiarlo directamente
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};
 
export default Header;
 
