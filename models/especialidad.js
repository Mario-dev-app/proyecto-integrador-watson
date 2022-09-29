const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Especialidad = sequelize.define( 'Especialidad',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Especialidad;