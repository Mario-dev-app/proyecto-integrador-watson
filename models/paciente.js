const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Paciente = sequelize.define('Paciente', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Paciente;