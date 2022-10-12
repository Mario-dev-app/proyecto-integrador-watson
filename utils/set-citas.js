const Cita = require('../models/cita');
const obtenerPosiblesDias = require('./get-posibles-dias');

const posiblesDias = obtenerPosiblesDias();

const citas = [
    {
        dni: '25611614',
        especialidad: 'ESP1',
        turno: 'M1',
        fecha: posiblesDias[2]
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M2',
        fecha: posiblesDias[2]
    },
    {
        dni: '25611614',
        especialidad: 'ESP1',
        turno: 'M3',
        fecha: posiblesDias[2]
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M4',
        fecha: posiblesDias[2]
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T1',
        fecha: posiblesDias[2]
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T2',
        fecha: posiblesDias[2]
    },
    {
        dni: '25611614',
        especialidad: 'ESP1',
        turno: 'T3',
        fecha: posiblesDias[2]
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T4',
        fecha: posiblesDias[2]
    },
    {
        dni: '72552743',
        especialidad: 'ESP4',
        turno: 'M3',
        fecha: posiblesDias[3]
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T1',
        fecha: posiblesDias[5]
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T4',
        fecha: posiblesDias[5]
    },
    {
        dni: '25611614',
        especialidad: 'ESP1',
        turno: 'T3',
        fecha: posiblesDias[0]
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M1',
        fecha: posiblesDias[0]
    },
    {
        dni: '25611614',
        especialidad: 'ESP1',
        turno: 'M3',
        fecha: posiblesDias[7]
    },
];

const setCitas = () => {
    citas.forEach( async (cita) =>{
        Cita.create(cita);
    });
};

module.exports = setCitas;