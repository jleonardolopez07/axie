const { response } = require("express");
const usuarios = require("../models/usuarios");



const esAdminRole = (req, res = response, next) => {

    const usuario = req.usuario
    if (!usuario) {
        return res.status(500).json({
            msg: `se quiere validar el rol sin antes haber validado el token`
        })
    }
    const { rol, nombre } = usuario;
    console.log(rol, nombre);
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }
    next();
}


const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        const usuario = req.usuario
        if (!usuario) {
            return res.status(500).json({
                msg: `se quiere validar el rol sin antes haber validado el token`
            })
        }
        if (!roles.includes(usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}