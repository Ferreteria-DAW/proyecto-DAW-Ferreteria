import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Profile = () => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const token = user?.token;

  useEffect(() => {
    if (!token) navigate("/login");
  });

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${user.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { username, email, avatar } = response.data;
      console.log(response.data);
      setUsername(username);
      setEmail(email);
      setAvatar(avatar);
    };
    getUser();
  }, []);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const userData = new FormData();
      userData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  const updateUserDetail = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", username, email, currentPassword, newPassword, confirmNewPassword);

    try {
      const userData = new FormData();
      userData.set("username", username);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);
      console.log(username)

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 200) {
        // log user out
        navigate("/logout");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="profile">
      <div className="container profile__container">
        {user && user.rol === "admin" && 
          <Link to={`/myproducts/${user.id}`} className="btn">
            DashBoard
          </Link>
        }
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                alt=""
              />
            </div>
            {/* Form to update avatar */}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg, webp, avif"
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile__avatar-btn"
                onClick={changeAvatarHandler}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{user.username}</h1>

          {/* Form to update user details */}

          <form
            action=""
            className="form profile__form"
            onSubmit={updateUserDetail}
          >
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Nombre Completo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirma Nueva contraseña"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            <button type="submit" className="btn primary">
              Actualizar usuario
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
