const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {
    const { q, nombre = 'No name', page = 1, limit } = req.query;
    res.json({
        "msg": "Get api - controller",
        q,
        nombre,
        page,
        limit
    })
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        "msg": "post api - controller",
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        "msg": "put api - controller",
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        "msg": "Delete api - controller"
    })
}


module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }