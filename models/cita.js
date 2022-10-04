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
    /* Agregar un campo más que sea booleano para indicar si la cita
    está pendiente */
});

module.exports = Cita;