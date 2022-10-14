const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

/* Obtener usuarios */
router.get('/usuarios', (req, res) => {
    Usuario.findAll().then((resp) => {
        res.json({
            ok: true,
            data: resp
        });
    }).catch((err) => {
        res.json({
            ok: false,
            message: err
        });
    });
});

/* Login de usuario */

module.exports = router;