const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');
const Especialidad = require('../models/especialidad');
const Turno = require('../models/turno');
const obtenerPosiblesDias = require('../utils/get-posibles-dias');

let especialidadCodigo;

let posiblesDias = [];

let indicesToRemove;

let codigoxHora = [
    { codigo: 'M1', hora: '8:00' }, { codigo: 'M2', hora: '9:00' }, { codigo: 'M3', hora: '10:00' }, { codigo: 'M4', hora: '11:00' },
    { codigo: 'T1', hora: '14:00' }, { codigo: 'T2', hora: '15:00' }, { codigo: 'T3', hora: '16:00' }, { codigo: 'T4', hora: '17:00' }
]

/* Obtener código de especialidad e indicar posibles fechas para la reserva de citas */
router.post('/get-horarios-1', (req, res) => {
    /*
   #swagger.parameters['especialidad'] = {
        in: 'body',
        description: 'Especialidad para la cita',
        schema: { especialidad: 'psicología'}
   }
   */
  /*
    #swagger.responses[200] = {
        description: 'Respuesta del primer flujo para obtener horarios',
        content: {
            "application/json": {
            schema: { $ref: "#/components/schemas/BasicResponse" } 
            }
        }
    }
    */
    let especialidadNombre = req.body.especialidad;
    Especialidad.findOne({ attributes: ['codigo'], where: { nombre: especialidadNombre } }).then(({ codigo }) => {
        especialidadCodigo = codigo;
        posiblesDias = obtenerPosiblesDias();
        console.log("Especialidad: ", especialidadNombre);
        console.log("Código: ", especialidadCodigo);
        res.json({
            ok: true,
            message: 'Se setearon la especialidad y los posibles días'
        });
    }).catch(err => {
        console.log(err);
        res.json({
            ok: false,
            message: 'Error al intentar obtener el código de la especialidad'
        });
    });
});

/* if ok == true */
router.get('/get-horarios-2', (req, res) => {
    /*
    #swagger.responses[200] = {
        description: 'Respuesta del segundo flujo para obtener horarios',
        content: {
            "application/json": {
            schema: { $ref: "#/components/schemas/BasicResponse" } 
            }
        }
    }
    */
    indicesToRemove = [];
    posiblesDias.forEach(async(dia, i) => {
        let turnosOcupadosxDia = await Cita.findAll({attributes: ['turno'] ,where: {fecha: dia, especialidad: especialidadCodigo, atendida: false}});

        let turnosTempArr = [];
        turnosOcupadosxDia.forEach(({turno}) => {
            turnosTempArr.push(turno);
        });

        if(turnosTempArr.length == codigoxHora.length){
            indicesToRemove.push(i);
        }
    });
    res.json({
        ok: true,
        message: 'Se obtuvo correctamente los índices a remover'
    });
});

/* Remover índices de fechas ocupadas */
router.get('/get-horarios-3', (req, res) => {
    /*
    #swagger.responses[200] = {
        description: 'Respuesta del tercer flujo para obtener horarios',
        content: {
            "application/json": {
            schema: { $ref: "#/components/schemas/ArrayResponse" } 
            }
        }
    }
    */
    indicesToRemove.forEach(indice => {
        posiblesDias.splice(indice, 1);
    });
    
    /* let message = '';
    posiblesDias.forEach((dia, i) => {
        if(i == 0){
            message = message + dia;
        }else{
            message = message + ', ' + dia;
        }
    }); */

    res.json({
        ok: true,
        message: posiblesDias
    });
});

/* Obtener los turnos disponibles por una fecha */
router.post('/turnos-fecha', async (req, res) => {
    /*
   #swagger.parameters['fecha'] = {
        in: 'body',
        description: 'Fecha para la cita',
        schema: { fecha: '10-10-2022'}
   }
   */
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