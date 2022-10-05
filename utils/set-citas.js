const Cita = require('../models/cita');

const citas = [
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'M1',
        fecha: '09-10-2022',
        atendida: false
    },
    {
        dni: '72552743',
        especialidad: 'ESP4',
        turno: 'M3',
        fecha: '09-11-2022',
        atendida: false
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T1',
        fecha: '09-12-2022',
        atendida: false
    },
    {
        dni: '72552743',
        especialidad: 'ESP1',
        turno: 'T3',
        fecha: '09-13-2022',
        atendida: false
    }
];

const setCitas = () => {
    citas.forEach( async (cita) =>{
        Cita.create(cita);
    });
};

module.exports = setCitas;