const { request } = require('express');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/usuarios');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuario que corresponde al uid 
        const usuario = await Usuarios.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }
        //Verificar si el uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}