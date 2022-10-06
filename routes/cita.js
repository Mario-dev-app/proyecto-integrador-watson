const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');
const Especialidad = require('../models/especialidad');
const Turno = require('../models/turno');
const obtenerPosiblesDias = require('../utils/get-posibles-dias');

let especialidadCodigo = 'ESP1';

let codigoxHora = [
    {codigo: 'M1', hora: '8:00'},{codigo: 'M2', hora: '9:00'},{codigo: 'M3', hora: '10:00'},{codigo: 'M4', hora: '11:00'},
    {codigo: 'T1', hora: '14:00'},{codigo: 'T2', hora: '15:00'},{codigo: 'T3', hora: '16:00'},{codigo: 'T4', hora: '17:00'}
]

/* Obtener y evaluar citas por especialidad obtenida */
router.post('/cita-no', (req, res) => {
    /*
   #swagger.parameters['especialidad'] = {
        in: 'body',
        description: 'Especialidad para la cita',
        schema: { especialidad: 'psicología'}
   }
   */
    let especialidadNombre = req.body.especialidad;
    let diasDisponibles = obtenerPosiblesDias();

    /* Obtenemos el código de la especialidad */
    Especialidad.findOne({ where: { nombre: especialidadNombre }, attributes: ['codigo'] })
        .then((resp1) => {
            Cita.findAll({ where: { especialidad: resp1.codigo, atendida: false } }).then(async (resp2) => {
                if (resp2.length == 0) {
                    /* Si no hay citas encontradas mandamos todas las posibles fechas para la cita */
                    let messageTemp = '';
                    const posiblesDiasIf = obtenerPosiblesDias();
                    posiblesDiasIf.forEach((dia, i) => {
                        if (i == 0) {
                            messageTemp = messageTemp + dia;
                        } else {
                            messageTemp = messageTemp + ', ' + dia;
                        }
                    });
                    res.json({
                        message: messageTemp
                    });
                } else {
                    /* Validar la disponibilidad de turnos por día*/
                    let posiblesDiasElse = obtenerPosiblesDias();
                    let indicesToRemove = [];
                    const turnos = await Turno.findAll({ attributes: ['codigo'] });
                    const turnosArr = [];
                    turnos.forEach(turno => {
                        turnosArr.push(turno.codigo);
                    });
                    posiblesDiasElse.forEach(async (dia, i) => {
                        let turnosArrTemp = [];
                        let turnosOcupadosPorDia = await Cita.findAll({ attributes: ['turno'], where: { fecha: dia, atendida: false, especialidad: resp1.codigo } });
                        if (turnosOcupadosPorDia.length !== 0) {
                            turnosOcupadosPorDia.forEach(turnoOcupado => {
                                turnosArrTemp.push(turnoOcupado.turno);
                            });
                            if (turnosArr.length === turnosArrTemp.length) {
                                diasDisponibles.splice(i, 1);
                                console.log('No hay turnos disponibles para la fecha ' + dia + ' con índice ' + i);
                            }
                            /* console.log("Turnos ocupados del día " + dia, turnosArrTemp); */
                            /* console.log(indicesToRemove); */
                        }
                    });
                    console.log(diasDisponibles);
                    res.json({
                        resp: resp2
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

router.post('/cita', async (req, res) => {
    let posibleFecha = req.body.fecha;
    const turnos = await Turno.findAll({ attributes: ['codigo'] });
    let turnosArr = [];
    turnos.forEach(turno => {
        turnosArr.push(turno.codigo);
    });
    let turnosOcupados = [];
    Cita.findAll({ attributes: ['turno'], where: { fecha: posibleFecha, especialidad: especialidadCodigo, atendida: false } })
        .then((turnos) => {
            turnos.forEach(({turno}) => {
                turnosArr = turnosArr.filter((turnoArr) => {
                    if(turnoArr !== turno){
                        return turnoArr;
                    }
                });
            });
            if(turnosArr.length == 0){
                res.json({
                    ok: false,
                    message: 'No hay horarios disponibles para esa fecha'
                });
            }else{
                let message = '';
                turnosArr.forEach(turno => {
                    codigoxHora.forEach((obj, i) => {
                        if(obj.codigo == turno){
                            if(i == 0){
                                message = message + obj.hora;
                            }else{
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