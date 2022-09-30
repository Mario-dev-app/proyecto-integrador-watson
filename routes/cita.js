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
    
});

module.exports = router;