const Turno = require('../models/turno');

const turnos = [
    {
        turno: 'mañana',
        codigo: 'M1',
        hora: '8:00'
    },
    {
        turno: 'mañana',
        codigo: 'M2',
        hora: '9:00'
    },
    {
        turno: 'mañana',
        codigo: 'M3',
        hora: '10:00'
    },
    {
        turno: 'mañana',
        codigo: 'M4',
        hora: '11:00'
    },
    {
        turno: 'tarde',
        codigo: 'T1',
        hora: '14:00'
    },
    {
        turno: 'tarde',
        codigo: 'T2',
        hora: '15:00'
    },
    {
        turno: 'tarde',
        codigo: 'T3',
        hora: '16:00'
    },
    {
        turno: 'tarde',
        codigo: 'T4',
        hora: '17:00'
    }
];

const setTurnos = () => {
    turnos.forEach( async (turno) => {
        await Turno.create(turno);
    });
};

module.exports = setTurnos;
