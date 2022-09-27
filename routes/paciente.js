const express = require('express');
const router = express.Router();
const Paciente = require('../models/paciente');

/* Validar si un paciente existe*/
router.post('/existe-paciente', (req, res) => {
    /*
    #swagger.responses[200] = {
        description: 'Retorna el paciente encontrado',
        content: {
            "application/json": {
            schema: { $ref: "#/components/schemas/Paciente" } 
            }
        }
    }
    */
   /*
   #swagger.parameters['dni'] = {
        in: 'body',
        description: 'DNI del paciente',
        schema: { dni: '72552743'}
   }
   */
    let dni = req.body.dni;
    console.log(dni);
    Paciente.findOne({attributes: ['id', 'nombre', 'correo', 'telefono', 'dni'] ,where: {dni: dni}}).then((registro) => {
        if(registro){
            res.send({paciente: registro});
        }else{
            res.send({
                ok: false,
                message: 'No se encontró registro con ese DNI'
            });
        }
    }).catch((err) => {
        res.send({
            error: err,
            message: 'Error al validar el DNI'
        });
    });
});

/* Obtener todos los pacientes */
router.get('/paciente', (req, res) => {
    Paciente.findAll().then((resp) => {
        res.json({
            ok: true,
            data: resp
        })
    }).catch((err) => {
        res.status(400).json({
            ok: false,
            message: err
        });
    });
});


/* Registrar un paciente */
router.post('/paciente', (req, res) => {
    let paciente = req.body;
    Paciente.sync();
    Paciente.create({
        nombre: paciente.nombre,
        correo: paciente.correo,
        telefono: paciente.telefono,
        dni: paciente.dni
    }).then(() => {
        res.json({
            ok: true,
            message: 'Paciente registrado correctamente'
        });
    }).catch((err) => {
        res.status(500).json({
            ok: false,
            message: err
        });
    })
});

module.exports = router;