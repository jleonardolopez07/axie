const { response, request } = require('express');
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req = request, res = response) => {
    //const { q, nombre = 'No name', page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, totalBlock, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.countDocuments({ estado: false }),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        totalBlock,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe

    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)
    usuario.nombre = usuario.nombre.toUpperCase()
        //guardar en DB
    await usuario.save();

    res.json({
        "msg": "post api - controller",
        usuario
    })
}

const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, google, ...resto } = req.body;

    //TODO validar contra base de datos
    if (resto) {
        //Encriptar la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    })
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    //fisicamente lo borramos
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    })
}


module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }