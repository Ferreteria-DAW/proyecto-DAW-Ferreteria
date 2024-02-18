import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Anchor } from "./Anchor";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  console.log(isAuthenticated, user);

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/products" : "/"}>
          Ferretería VegaGrande
        </Link>
      </h1>
      <ul className="flex gap-x-2">
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
