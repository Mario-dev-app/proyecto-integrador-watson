const express = require('express');
const router = express.Router();

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

router.post('/usuarios', (req, res) => {
    /*
    #swagger.parameters['usuario'] = {
        in: 'body',
        description: 'Nombre del usuario',
        schema: { nombre: 'Mario Peralta'}
    }
    */
    const usuario = body.usuario;
    console.log('Usuario:', usuario);
    res.json({
        ok: true
    });
});

module.exports = router;