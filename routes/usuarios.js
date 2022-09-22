const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

let pedido = {
    nombre: '',
    telefono: '',
    correo: '',
    pedido: ''
};

router.post('/date', (req, res) => {
    /*
   #swagger.parameters['fecha'] = {
        in: 'body',
        description: 'Fecha cualquiera',
        type: 'string',
        schema: { fecha: '22/09/2022'}
   }
   */
    let fecha = req.body.fecha;
    console.log(fecha);
    res.json({
        ok: true
    });
});

router.post('/usuario', (req, res) => {
    /*
    #swagger.responses[200] = {
        description: 'Some description...',
        content: {
            "application/json": {
            schema: { $ref: "#/components/schemas/Usuario" },
                      
            }
        }
    }
    */
   /*
   #swagger.parameters['dni'] = {
        in: 'body',
        description: 'DNI del usuario',
        schema: { dni: '72552743'}
   }
   */
    let dni = req.body.dni;
    console.log(dni);
    let usuario = {
        nombre: 'Mario Peralta Westreicher'
    }
    if(dni === '72552743'){
        res.send(usuario);
    }else{
        res.send({nombre: 'No se encontró registro con ese DNI'});
    }
});

router.get('/pedido', (req, res) => {
    Pedido.findAll().then((pedidos) => {
        res.json({
            ok: true,
            pedidos
        });
    }).catch( (err) => {
        res.status(400).json({
            ok:false,
            error: err
        });
    });
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
    }
    res.json({
        ok: true
    });
});

router.post('/pedido-pedido', async (req, res) => {
    /*
    #swagger.parameters['pedido'] = {
        in: 'body',
        description: 'Pedido del usuario',
        schema: { pedido: 'Iphone 14 Plus Max, Macbook Air'}
    }
    */
    const pedidoEnviado = req.body.pedido;
    if(pedidoEnviado){
        pedido.pedido = pedidoEnviado;
        console.log(pedido);
        await Pedido.sync();
        Pedido.create({
            nombre: pedido.nombre,
            telefono: pedido.telefono,
            correo: pedido.correo,
            pedido: pedido.pedido
        }).then(() => {
            console.log('Pedido registrado correctamente');
        }).catch( (err) => {
            console.log(err);
        });
    }
    res.json({
        ok: true
    });
});

module.exports = router;