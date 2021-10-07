const ValidaCampos = require('../middleware/validar-campos');
const ValidaJWT = require('../middleware/validar-jwt');
const ValidarRoles = require('../middleware/validar-roles');

module.exports = {
    ...ValidaCampos,
    ...ValidaJWT,
    ...ValidarRoles
}