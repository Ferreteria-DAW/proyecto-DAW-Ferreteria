import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import logo from "../images/toolstore/logoFerreteria.png";

import { FaRegSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";

import axios from "axios";

import { UserContext } from "../context/userContext";

const Header = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { user } = useContext(UserContext);
  const rol = user ? user.rol : "";

  const [avatar, setAvatar] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${user.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    if (user) {
      fetchAvatar();
    }
  }, [user]);

  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsBurgerActive(false); // Cerrar el menú en el modo de escritorio
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        {(isBurgerActive || window.innerWidth > 768) && (
          <ul className={`nav__menu ${showMenu && 'active'}`}>
            {user ? (
              <>
                <Avatar
                  className="mui-avatar"
                  alt={user.username}
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                />
                <li>
                  <Link
                    to={`/profile/${user.id}`}
                    onClick={() => setIsBurgerActive(false)}
                  >
                    {user.rol === "admin" ? "admin" : user?.username}
                  </Link>
                </li>
                {rol === "admin" && (
                  <li>
                    <Link to="/create" onClick={() => setIsBurgerActive(false)}>
                      Crear Producto
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/" onClick={() => setIsBurgerActive(false)}>
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={() => setIsBurgerActive(false)}>
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => setIsBurgerActive(false)}>
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => setIsBurgerActive(false)}>
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link to="/logout" onClick={() => setIsBurgerActive(false)}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsBurgerActive(false)}>
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setIsBurgerActive(false)}>
                    Registro
                  </Link>
                </li>
              </>
            )}
            {!isDarkMode ? (
              <FaRegSun className="switch-btn" onClick={toggleDarkMode} />
            ) : (
              <FaRegMoon className="switch-btn moon" onClick={toggleDarkMode} />
            )}
          </ul>
        )}

        <button
          className="nav__toggle-btn"
          onClick={() => {
            setIsBurgerActive(!isBurgerActive);
            toggleMenu();
          }}
        >
          {isBurgerActive ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
