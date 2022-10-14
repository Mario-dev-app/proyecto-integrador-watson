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
router.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let pass = req.body.pass;

    Usuario.findOne({where: {usuario: usuario, pass: pass}}).then((resp) => {
        if(!resp){
            return res.json({
                ok: false,
                message: 'Error al buscar usuario'
            });
        }
        res.json({
            ok: true,
            usuario: resp
        });
    }).catch((err) => {
        res.json({
            ok: false,
            message: 'Error al buscar usuario'
        });
    });
});

module.exports = router;