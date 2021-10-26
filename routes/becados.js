const { Router } = require('express');
const { check } = require('express-validator');
const { crearBecado, obtenerBecados, obtenerBecado, actualizarBecado, borrarBecado } = require('../controllers/becados');
const { existeBecadoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { esBecarioRole, esAdminRole, tieneRol } = require('../middleware/validar-roles');

const router = Router();

/** {{url}}/api/auth/becados */

//Obtener todos los becados - publico
router.get('/', obtenerBecados);

//Obtener un becado por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeBecadoPorId),
    validarCampos
], obtenerBecado)

//Crear becado - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    esBecarioRole,
    validarCampos
], crearBecado)

//Actualizar- privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    check('id').custom(existeBecadoPorId),
    validarCampos
], actualizarBecado);

//Borrar un becado - ADMIN
router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN_ROLE', 'BECARIO_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeBecadoPorId),
    validarCampos
], borrarBecado)



module.exports = router;