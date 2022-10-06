const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Turno = sequelize.define('Turno', {
    turno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Turno;