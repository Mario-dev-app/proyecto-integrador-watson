const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');
const Especialidad = require('../models/especialidad');

/* Obtener y evaluar citas por especialidad obtenida */
router.post('/cita', (req, res) => {
    /*
   #swagger.parameters['especialidad'] = {
        in: 'body',
        description: 'Especialidad para la cita',
        schema: { especialidad: 'psicología'}
   }
   */
    let especialidadNombre = req.body.especialidad;
    
    /* Obtenemos el código de la especialidad */
    Especialidad.findOne({where: { nombre: especialidadNombre}, attributes: ['codigo']})
    .then((resp) => {
        Cita.findAll({where: {especialidad: resp.codigo}}).then((resp) => {
            if(resp.length == 0){
                res.json({
                    message:'No hay citas agendadas para esa especialidad'
                });
            }else{
                res.json({
                    resp
                });
            }
        });
    }).catch((err) => {
        res.status(400).json({
            ok: false,
            message: 'No se encontró especialidad con ese nombre'
        });
    });
});

module.exports = router;