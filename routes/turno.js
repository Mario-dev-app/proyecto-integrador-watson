const express = require('express');
const router = express.Router();
const Turno = require('../models/turno');

/* Obtener la lista de turnos */
router.get('/turnos', (req, res) => {
    Turno.findAll().then((resp) => {
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