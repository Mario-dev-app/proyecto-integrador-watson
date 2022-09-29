const Especialidad = require('../models/especialidad');

const especialidadesArr = [
    'medicina general', 'ginecología',
    'psicología', 'pediatría',
    'otorrinolaringología', 'oftalmología',
    'odontología'];


const setEspecialidades = () => {
    especialidadesArr.forEach(async (especialidad, i) => {
        await Especialidad.create({
            nombre: especialidad,
            codigo: `ESP${i + 1}`
        });
    });
}

module.exports = setEspecialidades;