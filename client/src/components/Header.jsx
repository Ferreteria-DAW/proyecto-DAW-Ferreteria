import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import { UserContext } from "../context/userContext";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 768 ? true : false
  );
  const { user } = useContext(UserContext);

  const navHandler = () => {
    if (window.innerWidth <= 768) setIsNavShowing(false);
    else setIsNavShowing(true);
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav_logo" onClick={navHandler}>
          <img src="" alt="Logo" />
        </Link>
        {user?.id && isNavShowing && (
          <ul className="nav__menu">
            <li onClick={navHandler}>
              <Link to={`/profile/${user.id}`}>{user?.name}</Link>
            </li>
            <li onClick={navHandler}>
              <Link to="/create">Crear Producto</Link>
            </li>
            <li onClick={navHandler}>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
        {!user?.id && isNavShowing && (
          <ul className="nav__menu">
            <li onClick={navHandler}>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
