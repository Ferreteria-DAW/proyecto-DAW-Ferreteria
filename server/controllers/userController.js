const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const HttpError = require("../models/errorModel");
const User = require("../models/userModel");

/* Registro de nuevo usuario
Ruta: post --> api/users/register
NO PROTEGIDA */

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password)
      return next(new HttpError("Todos los campos son obligatorios", 422));

    const lowerEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: lowerEmail });

    if (userExists) return next(new HttpError("El usuario ya existe", 422));

    if (password.trim().length < 8)
      return next(
        new HttpError("La contraseña debe tener al menos 8 caracteres", 422)
      );

    if (password != confirmPassword)
      return next(new HttpError("Las contraseñas no coinciden", 422));

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingAdmin = await User.findOne({ rol: "admin" });

    if (!existingAdmin && email == process.env.ADMIN_EMAIL) {
      const newUser = await User.create({
        username,
        email: lowerEmail,
        password: hashedPassword,
        rol: "admin",
      });
      res
        .status(201)
        .json({
          message: `Usuario registrado correctamente con el email ${newUser.email} y el rol de ${newUser.rol}`,
        });
    } else {
      const newUser = await User.create({
        username,
        email: lowerEmail,
        password: hashedPassword,
      });
      res
        .status(201)
        .json({
          message: `Usuario registrado correctamente con el email ${newUser.email}`,
        });
    }
  } catch (err) {
    next(new HttpError("No se pudo registrar el usuario", 500));
  }
};
/* Inicio de sesión Usuario */
/* Ruta: post : api/users/login */
/* NO PROTEGIDA */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new HttpError("Todos los campos son obligatorios", 422));
    const lowerEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowerEmail });

    if (!user) return next(new HttpError("El usuario no existe", 422));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new HttpError("Credenciales incorrectas", 422));
    const { _id: id, username } = user;
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(user)
    res.status(200).json({ token, id, username, rol: user.rol });
  } catch (err) {
    return next(new HttpError("No se pudo iniciar sesión", 500));
  }
};

/* Perfil de usuario
Ruta: post --> api/users/:id
PROTEGIDA */

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) return next(new HttpError("Usuario no encontrado", 404));

    res.status(200).json(user);
  } catch (err) {
    return next(new HttpError("No se pudo obtener el usuario", 500));
  }
};

/* Cambiar foto de perfild de usuario */
/* Ruta: post : api/users/change-avatar */
/* PROTEGIDA */

const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar)
      return next(new HttpError("No se ha cargado ninguna imagen", 422));

    const user = await User.findById(req.user.id);

    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err)
          return next(
            new HttpError("No se pudo cambiar la foto de perfil", 500)
          );
      });
    }

    const { avatar } = req.files;

    if (avatar.size > 500000)
      return next(new HttpError("La imagen no debe pesar más de 500KB", 422));

    let fileName = avatar.name;
    let splittedName = fileName.split(".");
    let newFIlename =
      splittedName[0] + uuid() + "." + splittedName[splittedName.length - 1];

    avatar.mv(
      path.join(__dirname, "..", "uploads", newFIlename),
      async (err) => {
        if (err)
          return next(
            new HttpError("No se pudo cambiar la foto de perfil", 500)
          );

        const updatedAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFIlename },
          { new: true }
        );

        if (!updatedAvatar)
          return next(
            new HttpError("No se pudo cambiar la foto de perfil", 500)
          );

        res.status(200).json(updatedAvatar);
      }
    );
  } catch (err) {
    return next(new HttpError("No se pudo cambiar la foto de perfil", 500));
  }
};

/* EDITAR USUARIO
Ruta: post __> api/users/edit-user
PROTEGIDA */

const editUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;
    console.log(username, email, currentPassword, newPassword, confirmNewPassword);
    console.log(req.body)
    if (!username || !email || !currentPassword || !newPassword)
      return next(new HttpError("Todos los campos son obligatorios", 422));

    const user = await User.findById(req.user.id);
    if (!user) return next(new HttpError("Usuario no encontrado", 404));

    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id != user.id)
      return next(new HttpError("El email ya está en uso", 422));

    const validateCurrentPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!validateCurrentPassword)
      return next(new HttpError("La contraseña actual es incorrecta", 422));

    if (newPassword !== confirmNewPassword)
      return next(new HttpError("Las contraseñas no coinciden", 422));

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const newUserInfo = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, password: hashedPassword },
      { new: true }
    );
    res.status(200).json(newUserInfo);
  } catch (err) {
    return next(new HttpError("No se pudo editar el usuario", 500));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
};
