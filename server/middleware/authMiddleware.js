const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');

const authMiddleware = (req, res, next) => {
    const Authorization = req.headers.Authorization || req.headers.authorization;

    if(Authorization && Authorization.startsWith('Bearer')) {
        const token = Authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if(err) return next(new HttpError('Token no válido, autorización denegada', 403));

            req.user = info;
            next();
        })
    } else return next(new HttpError('No autorizado, falta Token', 402));
}

module.exports = authMiddleware;