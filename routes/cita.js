const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');
const Especialidad = require('../models/especialidad');
const Turno = require('../models/turno');
const obtenerPosiblesDias = require('../utils/get-posibles-dias');

let especialidadCodigo;

let codigoxHora = [
    { codigo: 'M1', hora: '8:00' }, { codigo: 'M2', hora: '9:00' }, { codigo: 'M3', hora: '10:00' }, { codigo: 'M4', hora: '11:00' },
    { codigo: 'T1', hora: '14:00' }, { codigo: 'T2', hora: '15:00' }, { codigo: 'T3', hora: '16:00' }, { codigo: 'T4', hora: '17:00' }
]

/* Obtener código de especialidad e indicar posibles fechas para la reserva de citas */
router.post('/posibles-horarios', (req, res) => {
    /*
   #swagger.parameters['especialidad'] = {
        in: 'body',
        description: 'Especialidad para la cita',
        schema: { especialidad: 'psicología'}
   }
   */
   let especialidadNombre = req.body.especialidad;
   Especialidad.findOne({attributes: ['codigo'] ,where: {nombre: especialidadNombre}}).then(({codigo}) => {
    especialidadCodigo = codigo;
    console.log(especialidadCodigo);
   }).catch(err => console.log);
});

/* Obtener los turnos disponibles por una fecha */
router.post('/turnos-fecha', async (req, res) => {
    let posibleFecha = req.body.fecha;
    const turnos = await Turno.findAll({ attributes: ['codigo'] });
    let turnosArr = [];
    turnos.forEach(turno => {
        turnosArr.push(turno.codigo);
    });
    Cita.findAll({ attributes: ['turno'], where: { fecha: posibleFecha, especialidad: especialidadCodigo, atendida: false } })
        .then((turnos) => {
            turnos.forEach(({ turno }) => {
                turnosArr = turnosArr.filter((turnoArr) => {
                    if (turnoArr !== turno) {
                        return turnoArr;
                    }
                });
            });
            if (turnosArr.length == 0) {
                res.json({
                    ok: false,
                    message: 'No hay horarios disponibles para esa fecha'
                });
            } else {
                let message = '';
                turnosArr.forEach(turno => {
                    codigoxHora.forEach((obj, i) => {
                        if (obj.codigo == turno) {
                            if (i == 0) {
                                message = message + obj.hora;
                            } else {
                                message = message + ', ' + obj.hora;
                            }
                        }
                    });
                });
                res.json({
                    ok: true,
                    message: message
                });
            }
        }).catch(err => {
            console.log(err);
            res.json({
                ok: false,
                message: 'Hubo un error al validar la fecha y los turnos'
            });
        });
});

/* Obtener citas */
router.get('/citas', (req, res) => {
    Cita.findAll().then((resp) => {
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
})

module.exports = router;