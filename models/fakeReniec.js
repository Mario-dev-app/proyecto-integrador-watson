const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');


const FakeReniec = sequelize.define('FakeReniec', {
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = FakeReniec;