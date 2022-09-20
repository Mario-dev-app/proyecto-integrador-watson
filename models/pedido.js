const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Pedido = sequelize.define('Pedido', {
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
    pedido: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Pedido;