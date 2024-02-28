import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import logo from "../images/toolstore/logoFerreteria.png";

import axios from "axios";

import { UserContext } from "../context/userContext";

const Header2 = () => {
  const { user } = useContext(UserContext);
  const rol = user ? user.rol : "";

  const [avatar, setAvatar] = useState(""); // Nuevo estado para el avatar

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
  }, [user]); // Llamar a fetchAvatar cuando cambie el usuario

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logoFerreteria" className="logo" />
      </Link>
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
        />

        <label htmlForor="navi-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
        </label>

        <div className="navigation__background">&nbsp;</div>

        <nav className="navigation__nav">
          {user && (
            <Avatar
              className="mui-avatar"
              alt={user.username}
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
            />
          )}
          <Link to={`/profile/${user.id}`}>
            {user.rol === "admin" ? "admin" : user?.username}
          </Link>
          <ul className="navigation__list">
            {!user && (
              <>
                <li>
                  <Link to="/login">Iniciar sesión</Link>
                </li>
                <li>
                  <Link to="/register">Registro</Link>
                </li>
              </>
            )}

            <li className="navigation__item">
              <Link to="/" className="navigation__link">
                <span>01</span>Inicio
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/products" className="navigation__link">
                <span>02</span>Productos y Servicios
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/about" className="navigation__link">
                <span>03</span>Quienes Somos
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/contact" className="navigation__link">
                <span>04</span>Contacto
              </Link>
            </li>
            {rol === "admin" && (
              <li className="navigation__item">
                <Link to="/create">
                  <span>05</span>Crear Producto
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header2;
