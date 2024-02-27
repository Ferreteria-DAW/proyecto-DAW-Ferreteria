const { Router } = require('express');

const { registerUser, loginUser, getUser, changeAvatar, editUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/register', registerUser); //registro de usuario
router.post('/login', loginUser); //Inicio de sesión
router.get('/:id', getUser); //Perfil de usuario
router.post('/change-avatar', authMiddleware, changeAvatar); //Cambiar foto de perfil
router.patch('/edit-user', authMiddleware, editUser); //Editar usuario

module.exports = router;