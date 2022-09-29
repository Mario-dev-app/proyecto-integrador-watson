const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Cita = sequelize.define({
    paciente_test: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cita;