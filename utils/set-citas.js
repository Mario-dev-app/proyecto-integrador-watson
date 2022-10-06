const Cita = require('../models/cita');

const citas = [
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M1',
        fecha: '10-10-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M2',
        fecha: '10-10-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M3',
        fecha: '10-10-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M4',
        fecha: '10-10-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T1',
        fecha: '10-10-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T2',
        fecha: '10-10-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T3',
        fecha: '10-10-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T4',
        fecha: '10-10-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP4',
        turno: 'M3',
        fecha: '10-11-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T1',
        fecha: '10-12-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T4',
        fecha: '10-12-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T3',
        fecha: '10-13-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M1',
        fecha: '10-13-2022'
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M3',
        fecha: '10-13-2022'
    },
];

const setCitas = () => {
    citas.forEach( async (cita) =>{
        Cita.create(cita);
    });
};

module.exports = setCitas;