const Role = require('../models/role');
const Usuario = require('../models/usuarios')




const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de DB `)
    }
}

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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}