const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.get('/usuarios', (req, res) => {
   
    let usuarios = [
        {
            nombre: 'Mario',
            apellido: 'Peralta',
            edad: 27
        },
        {
            nombre: 'Julio',
            apellido: 'Zapata',
            edad: 35
        }
    ];

    if (usuarios) {
        res.json({
            usuarios,
            message: 'Hay usuarios'
        });
    } else {
        res.status(500).json({
            message: 'No hay usuarios para mostrar'
        });
    }
});

router.post('/usuarios', async (req, res) => {
    /*
    #swagger.parameters['usuario'] = {
        in: 'body',
        description: 'Nombre del usuario',
        schema: { nombre: 'Mario Peralta'}
    }
    */
    const usuario = req.body.usuario;
    if(usuario){
        console.log('Usuario:', usuario);
        await Usuario.sync();
        Usuario.create({
            nombre: usuario
        }).then(() => {
            console.log('Usuario registrado correctamente: ', usuario);
        }).catch( (err) => {
            console.log(err);
        });
    }
    res.json({
        ok: true
    });
});

module.exports = router;