const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Cita = sequelize.define('Cita', {
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    turno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cita;