const Usuario = require('../models/usuario');

const setUsuarios = async () => {
    await Usuario.create({
        usuario: 'admin',
        pass: 'admin'
    });
}

module.exports = setUsuarios;