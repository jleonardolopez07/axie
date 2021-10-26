const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const Usuario = require('../models/usuarios')
const Becado = require('../models/becado')


const becariosPermitidos = [
    'becarios',
    'becados',
    'roles'
];
//var becariosPermitidos = 'becarios'

const buscarBecarios = async(becado = '', res = response) => {
    const esMongoID = ObjectId.isValid(becado);

    if (esMongoID) {
        const [total, totalAllow, totalBlock, becados] = await Promise.all([
            Usuario.findById(becado),
            Becado.countDocuments({ estado: true, usuario: ObjectId(becado) }),
            Becado.countDocuments({ estado: false, usuario: ObjectId(becado) }),
            Becado.find({ usuario: ObjectId(becado) })
            .populate('usuario', 'nombre')
        ])
        return res.json({
            total,
            totalAllow,
            totalBlock,
            becados
        })
    }
    /*     if (esMongoID) {
            const usuario = await Usuario.findById(becado);
            const usuario2 = await Becado.find({ usuario: ObjectId(becado) }).populate('usuario', 'nombre')
            return res.json({
                results: [(usuario) ? [usuario] : [],
                    (usuario2) ? [usuario2] : []
                ]
            })
        } */

    const regex = new RegExp(becado, 'i')

    const usuarios = await Usuario.find({

        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: usuarios
    })
}

const buscarBecados = async(becado = '', res = response) => {
    const esMongoID = ObjectId.isValid(becado);
    if (esMongoID) {
        const userBecado = await Becado.findById(becado)
            .populate('usuario');
        return res.json({
            results: (userBecado) ? [userBecado] : []
        })
    }

    const regex = new RegExp(becado, 'i')
    const usuarios = await Becado.find({ nombre: regex, estado: true })
        .populate('usuario', 'nombre')
    console.log(usuarios);
    //const usuarios.usuario.nombre
    res.json({
        results: usuarios
    })
}


const buscador = (req, res = response) => {
    const { becario, becado } = req.params

    if (!becariosPermitidos.includes(becario)) {
        return res.status(400).json({
            msg: `Los becarios permitidos son: ${becariosPermitidos}`
        })
    }


    switch (becario) {
        case 'becarios':
            buscarBecarios(becado, res)
            break;

        case 'becados':
            buscarBecados(becado, res)
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            });
            break;
    }
}
module.exports = {
    buscador
}