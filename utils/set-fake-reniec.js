const FakeReniec = require('../models/fakeReniec');

const personas = [
    {
        dni: '72552743',
        nombre: 'Mario',
        apellidos: 'Peralta Westreicher'
    },
    {
        dni: '25611614',
        nombre: 'Herlinda',
        apellidos: 'Westreicher Soto'
    }
];

const setFakeReniec = () => {
    personas.forEach( async (persona) => {
        await FakeReniec.create(persona);
    });
};

module.exports = setFakeReniec;