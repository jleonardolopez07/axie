const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, becadoLogin } = require('../controllers/auth');
const { existeBecadoporNombre } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo no es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'Token de google no es valido').not().isEmpty(),
    validarCampos
], googleSignIn);

router.post('/becado', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('becario', 'El becario es obligatorio').not().isEmpty(),
    check('nombre').custom(existeBecadoporNombre),
    validarCampos
], becadoLogin)



module.exports = router;