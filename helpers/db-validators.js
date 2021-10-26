const Becado = require('../models/becado');
const Role = require('../models/role');
const Usuario = require('../models/usuarios')




const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de DB `)
    }
}

/* const esRoleBecado = async(rol = '') => {
    const existeRolBecado = await Role.findOne({rol});
    if (!esRoleBecado) {
        throw new Error(`El rol ${rol} no esta registrado en la base de DB `)
    }
} */

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo: correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado en DB`)
    }
}

const existeUsuarioPorId = async(id = '') => {
    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id} en la DB`)
    }
}

///////////////////////////////////////////////////////////////////////
////// VALIDADORES DE BECADOS ///////////////////////////////////////////////////

const existeBecadoPorId = async(id = '') => {
    //verificar si el correo existe
    const existeBecado = await Becado.findById(id)
    if (!existeBecado) {
        throw new Error(`El id no existe ${id} en la DB`)
    }
}

const existeBecadoporNombre = async(nombre = '') => {
    const existeBecado = await Becado.findOne({ nombre })
    if (!existeBecado) {
        throw new Error(`El becado ${nombre} No esta registrado en DB`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeBecadoPorId,
    existeBecadoporNombre
}