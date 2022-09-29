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
            res.send(registro);
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
    /*
    #swagger.parameters['nombre'] = {
        in: 'body',
        description: 'Nombre del paciente',
        schema: { nombre: 'Mario Peralta Westreicher'}
    }
    */
    /*
    #swagger.parameters['correo'] = {
        in: 'body',
        description: 'Correo del paciente',
        schema: { correo: 'mario@gmail.com'}
    }
    */
    /*
    #swagger.parameters['telefono'] = {
        in: 'body',
        description: 'Telefono del paciente',
        schema: { telefono: '972914057'}
    }
    */
    /*
    #swagger.parameters['dni'] = {
        in: 'body',
        description: 'DNI del paciente',
        schema: { dni: '72552743'}
    }
    */
   /*
    #swagger.responses[200] = {
        description: 'Respuesta del registro de paciente',
        content: {
            "application/json": {
            schema: { $ref: "#/components/schemas/PacientePostResp" } 
            }
        }
    }
    */
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let telefono = req.body.telefono;
    let dni = req.body.dni;
    Paciente.sync({force: true});
    Paciente.create({
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        dni: dni
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

/* Eliminar un paciente */
router.delete('/paciente', (req, res) => {
    let dni = req.body.dni;
    Paciente.findOne({where: {dni: dni}}).then((paciente) => {
        if(paciente){
            Paciente.destroy({where: {dni: dni}}).then(() => {
                res.json({
                    ok: true,
                    message: 'Paciente eliminado de la BD correctamente'
                });
            }).catch((err) => {
                res.status(400).json({
                    ok: false,
                    message: err
                });
            });
        }else{
            res.status(400).json({
                ok: false,
                message: `Error al buscar paciente con DNI ${dni}`
            });
        }
    }).catch((err) => {
        res.status(400).json({
            ok: false,
            message: err
        });
    });
});

module.exports = router;