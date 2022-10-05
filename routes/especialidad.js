const express = require('express');
const router = express.Router();
const Especialidad = require('../models/especialidad');

/* Obtener todas las especialidades */
router.get('/especialidades', (req, res) => {
    Especialidad.findAll().then((resp) => {
        res.json({
            ok: true,
            data: resp
        });
    }).catch( (err) => {
        res.status(400).json({
            ok: false,
            message: err
        });
    });
});

module.exports = router;