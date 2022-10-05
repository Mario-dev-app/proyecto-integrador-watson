const express = require('express');
const router = express.Router();
const FakeReniec = require('../models/fakeReniec');

/* Si el paciente no existe, validar si se encuentra en FakeReniec */
router.post('/existe-fake-reniec', (req, res) => {
    /*
    #swagger.responses[200] = {
        description: 'Retorna la persona encontrada',
        content: {
            "application/json": {
            schema: { $ref: "#/components/schemas/FakeReniec" } 
            }
        }
    }
    */
   /*
   #swagger.parameters['dni'] = {
        in: 'body',
        description: 'DNI de la persona',
        schema: { dni: '72552743'}
   }
   */
   let dni = req.body.dni;
   FakeReniec.findOne({attributes: ['dni', 'nombre', 'apellidos'], where: {dni: dni}}).then((registro) => {
    if(registro){
        res.send(registro);
    }else{
        res.status(400).send({
            ok: false,
            message: 'No se encontró registro con ese DNI'
        });
    }
   }).catch((err) => {
    console.log(err);
    res.status(500).send({
        ok: false,
        message: 'Error al validar el DNI'
    });
   })
});

/* Obtener personas en FakeReniec */
router.get('/fake-reniec', (req, res) => {
    FakeReniec.findAll().then((resp) => {
        res.json({
            ok: true,
            data: resp
        });
    }).catch((err) => {
        res.status(400).json({
            ok: false,
            message: err
        });
    });
});

module.exports = router;