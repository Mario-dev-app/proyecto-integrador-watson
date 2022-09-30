const Paciente = require('../models/paciente');

const pacientes = [
    {
        nombre: 'Mario Peralta Westreicher',
        telefono: '972914057',
        correo: 'mariopw4@gmail.com',
        dni: '72552743'
    }
];

const setPacientes = () =>{
    pacientes.forEach( async (paciente) => {
        await Paciente.create(paciente);
    });
}

module.exports = setPacientes;