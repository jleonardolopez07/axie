const { Schema, model } = require('mongoose');

const loginBecadosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: [true, 'Este usuario ya existe, por favor cree otro nombre']

    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMINBECADO_ROLE']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    becario: {
        type: Schema.Types.ObjectId,
        ref: 'Becario',
        require: true
    },
    describcion: { type: String },
    disponible: { type: Boolean, default: true }
});

loginBecadosSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}


module.exports = model('dashboardBecado', loginBecadosSchema)