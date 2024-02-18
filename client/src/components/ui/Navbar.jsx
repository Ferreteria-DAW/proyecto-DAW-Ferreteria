import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Anchor } from "./Anchor";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  console.log(isAuthenticated, user);

  return (
    <nav>
      <h1>
        <Link to={isAuthenticated ? "/products" : "/"}>
          {" "}
          Ferretería VegaGrande
        </Link>
      </h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li>{user.username}</li>
            <li>
              <Link to={"/"} onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Anchor to="/login">Login</Anchor>
            </li>
            <li>
              <Anchor to="/register">Register</Anchor>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
