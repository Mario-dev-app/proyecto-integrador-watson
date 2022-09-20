const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

let pedido = {
    nombre: '',
    telefono: '',
    correo: '',
    pedido: ''
};

router.get('/usuarios', (req, res) => {
    let usuarios = {
            nombre: 'Mario',
            apellido: 'Peralta',
            edad: 27
        };

    if (usuarios) {
        res.send(usuarios);
    } 
});

router.post('/pedido-nombre', async (req, res) => {
    /*
    #swagger.parameters['nombre'] = {
        in: 'body',
        description: 'Nombre del usuario',
        schema: { nombre: 'Mario Peralta'}
    }
    */
    const nombre = req.body.nombre;
    if(nombre){
        pedido.nombre = nombre;
        console.log(pedido);
        /* await Pedido.sync();
        Pedido.create({
            nombre: nombre
        }).then(() => {
            console.log('Usuario registrado correctamente: ', nombre);
        }).catch( (err) => {
            console.log(err);
        }); */
    }
    res.json({
        ok: true
    });
});

router.post('/pedido-telefono', async (req, res) => {
    /*
    #swagger.parameters['telefono'] = {
        in: 'body',
        description: 'Teléfono del usuario',
        schema: { telefono: '972914057'}
    }
    */
    const telefono = req.body.telefono;
    if(telefono){
        pedido.telefono = telefono;
        console.log(pedido);
        /* await Pedido.sync();
        Pedido.create({
            nombre: telefono
        }).then(() => {
            console.log('Usuario registrado correctamente: ', telefono);
        }).catch( (err) => {
            console.log(err);
        }); */
    }
    res.json({
        ok: true
    });
});

router.post('/pedido-correo', async (req, res) => {
    /*
    #swagger.parameters['correo'] = {
        in: 'body',
        description: 'Correo del usuario',
        schema: { correo: 'mariopw4@gmail.com'}
    }
    */
    const correo = req.body.correo;
    if(correo){
        pedido.correo = correo;
        console.log(pedido);
        /* await Pedido.sync();
        Pedido.create({
            nombre: telefono
        }).then(() => {
            console.log('Usuario registrado correctamente: ', telefono);
        }).catch( (err) => {
            console.log(err);
        }); */
    }
    res.json({
        ok: true
    });
});

module.exports = router;