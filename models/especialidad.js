const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Especialidad = sequelize.define({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Especialidad;