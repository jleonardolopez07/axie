const { response } = require('express')
const Becado = require('../models/becado')

//OBTENER BECADOS - PAGINADO - TOTAL - POPULATE 

const obtenerBecados = async(req, res = response) => {
    //const { q, nombre = 'No name', page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, totalBlock, becados] = await Promise.all([
        Becado.countDocuments(query),
        Becado.countDocuments({ estado: false }),
        Becado.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        totalBlock,
        becados
    })
}

//OBTENER BECADOS -  POPULATE 
const obtenerBecado = async(req, res = response) => {
    const { id } = req.params;
    const becado = await Becado.findById(id).populate('usuario', 'nombre');
    res.json(becado);
}


//CREAR BECADOS
const crearBecado = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const password = req.body.password

    const becadoDB = await Becado.findOne({ nombre });

    if (becadoDB) {
        return res.status(400).json({
            msg: `El becado ${becadoDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        password,
        rol: "BECADO_ROLE",
        usuario: req.usuario._id,
    }
    const becado = new Becado(data);
    //Guardar DB
    await becado.save();
    res.status(201).json(becado)
}


//ACTUALIZAR CATEGORIA

const actualizarBecado = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, rol, ...data } = req.body
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id

    const becado = await Becado.findByIdAndUpdate(id, data, { new: true })
    res.json(becado)
}

// BORRAR CATEGORIA
const borrarBecado = async(req, res = response) => {
    const { id } = req.params;
    const becadoBorrado = await Becado.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(becadoBorrado)
}


module.exports = {
    crearBecado,
    obtenerBecados,
    obtenerBecado,
    actualizarBecado,
    borrarBecado
}