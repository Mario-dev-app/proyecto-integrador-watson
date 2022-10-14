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
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    atendida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Cita;