const { Schema, model } = require('mongoose');

const BecadoSchema = Schema({
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
        enum: ['BECADO_ROLE']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});

BecadoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}


module.exports = model('Becado', BecadoSchema)