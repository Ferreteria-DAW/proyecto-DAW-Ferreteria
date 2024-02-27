const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const HttpError = require('../models/errorModel');
const User = require('../models/userModel');

/* Registro de nuevo usuario
Ruta: post --> api/users/register
NO PROTEGIDA */

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if(!username || !email || !password) return next(new HttpError('Todos los campos son obligatorios', 422));

        const lowerEmail = email.toLowerCase();

        const userExists = await User.findOne({ email: lowerEmail });

        if(userExists) return next(new HttpError('El usuario ya existe', 422));

        if(password.trim().length < 8) return next(new HttpError('La contraseña debe tener al menos 8 caracteres', 422));

        if(password != confirmPassword) return next(new HttpError('Las contraseñas no coinciden', 422));

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email: lowerEmail,
            password: hashedPassword,
        });
        res.status(201).json({ message: `Usuario registrado correctamente con el email ${lowerEmail}`});
        
    } catch(err) {
        next(new HttpError('No se pudo registrar el usuario', 500));
    }
}