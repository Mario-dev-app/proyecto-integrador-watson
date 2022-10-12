const Paciente = require('../models/paciente');

const pacientes = [
    {
        nombre: 'Mario',
        apellidos: 'Peralta Westreicher',
        telefono: '972914057',
        correo: 'mariopw4@gmail.com',
        dni: '72552743'
    },
    {
        nombre: 'Herlinda',
        apellidos: 'Westreicher Soto',
        telefono: '943579481',
        correo: 'i201711909@cibertec.edu.pe',
        dni: '25611614'
    }
];

const setPacientes = () =>{
    pacientes.forEach( async (paciente) => {
        await Paciente.create(paciente);
    });
}

module.exports = setPacientes;