const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');
const Especialidad = require('../models/especialidad');
const Turno = require('../models/turno');
const obtenerPosiblesDias = require('../utils/get-posibles-dias');

let especialidadCodigo;

let posiblesDias = [];

let posiblesHorarios = [];

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
    let especialidadNombre = req.body.especialidad.trim();
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
    posiblesDias.forEach(async (dia, i) => {
        let turnosOcupadosxDia = await Cita.findAll({ attributes: ['turno'], where: { fecha: dia, especialidad: especialidadCodigo, atendida: false } });

        let turnosTempArr = [];
        turnosOcupadosxDia.forEach(({ turno }) => {
            turnosTempArr.push(turno);
        });

        if (turnosTempArr.length == codigoxHora.length) {
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
            schema: { $ref: "#/components/schemas/BasicResponse" } 
            }
        }
    }
    */
    indicesToRemove.forEach(indice => {
        posiblesDias.splice(indice, 1);
    });

    let message = '';
    posiblesDias.forEach((dia, i) => {
        if (i == 0) {
            message = message + dia;
        } else {
            message = message + ', ' + dia;
        }
    });

    res.json({
        ok: true,
        message: message
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
    /*
      #swagger.responses[200] = {
          description: 'Respuesta de los turnos por fecha según especialidad',
          content: {
              "application/json": {
              schema: { $ref: "#/components/schemas/BasicResponse" } 
              }
          }
      }
      */
    let posibleFecha = req.body.fecha.trim();
    if (!posiblesDias.includes(posibleFecha)) {
        return res.json({
            ok: false,
            message: 'El día ingresado no está dentro del rango sugerido'
        });
    }
    const turnos = await Turno.findAll({ attributes: ['codigo'] });
    let turnosArr = [];
    turnos.forEach(turno => {
        turnosArr.push(turno.codigo);
    });
    Cita.findAll({ attributes: ['turno'], where: { fecha: posibleFecha, especialidad: especialidadCodigo, atendida: false } })
        .then((turnos) => {
            turnos.forEach(({ turno }) => {
                console.log(turno);
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
                console.log(turnosArr);
                console.log(codigoxHora);
                turnosArr.forEach(turno => {
                    codigoxHora.forEach((obj, i) => {
                        if (obj.codigo == turno) {
                            posiblesHorarios.push(obj.hora.trim());
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

/* Validar si la hora ingresada está dentro de las sugeridas */
router.post('/valida-horario', (req, res) => {
    /*
    #swagger.parameters['hora'] = {
            in: 'body',
            description: 'Hora para la cita',
            schema: { hora: '08:00'}
    }
   */
    /*
        #swagger.responses[200] = {
            description: 'Respuesta de la validación del horario enviado por el paciente',
            content: {
                "application/json": {
                schema: { $ref: "#/components/schemas/BasicResponse" } 
                }
            }
        }
        */
    let hora = req.body.hora.trim();
    if (!posiblesHorarios.includes(hora)) {
        res.json({
            ok: false,
            message: 'La hora ingresada no está dentro del rango sugerido'
        });
    } else {
        res.json({
            ok: true,
            message: 'El horario está dentro de las sugerencias'
        });
    }
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
});

/* Registrar cita */
router.post('/registrar-cita', async (req, res) => {
    /*
      #swagger.responses[200] = {
          description: 'Respuesta del registro de la cita',
          content: {
              "application/json": {
              schema: { $ref: "#/components/schemas/BasicResponse" } 
              }
          }
      }
      */
    /*
    #swagger.parameters['dni'] = {
            in: 'body',
            description: 'DNI para la cita',
            schema: { dni: '72552743'}
    }
   */
    /*
      #swagger.parameters['especialidad'] = {
              in: 'body',
              description: 'Especialidad para la cita',
              schema: { especialidad: 'psicología'}
      }
     */
    /*
      #swagger.parameters['turno'] = {
              in: 'body',
              description: 'Turno para la cita',
              schema: { turno: '08:00'}
      }
     */
    /*
      #swagger.parameters['fecha'] = {
              in: 'body',
              description: 'Fecha para la cita',
              schema: { fecha: '10-10-2022'}
      }
     */
    let dni = req.body.dni.trim();
    let especialidad = req.body.especialidad.trim();
    let turno = req.body.turno.trim();
    let fecha = req.body.fecha.trim();

    const codigoEspecialidad = await Especialidad.findOne({ attributes: ['codigo'], where: { nombre: especialidad } });
    const codigoTurno = codigoxHora.filter(turnoResp => {
        if (turnoResp.hora == turno) {
            return turnoResp.codigo;
        }
    });

    console.log(dni, codigoEspecialidad, codigoTurno, fecha);
});

module.exports = router;