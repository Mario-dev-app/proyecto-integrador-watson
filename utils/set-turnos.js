const Turno = require('../models/turno');

const turnos = [
    {
        turno: 'mañana',
        codigo: 'M1',
        hora: 8
    },
    {
        turno: 'mañana',
        codigo: 'M2',
        hora: 9
    },
    {
        turno: 'mañana',
        codigo: 'M3',
        hora: 10
    },
    {
        turno: 'mañana',
        codigo: 'M4',
        hora: 11
    },
    {
        turno: 'tarde',
        codigo: 'T1',
        hora: 2
    },
    {
        turno: 'tarde',
        codigo: 'T2',
        hora: 3
    },
    {
        turno: 'tarde',
        codigo: 'T3',
        hora: 4
    },
    {
        turno: 'tarde',
        codigo: 'T4',
        hora: 5
    }
];

const setTurnos = () => {
    turnos.forEach( async (turno) => {
        await Turno.create(turno);
    });
};

module.exports = setTurnos;
