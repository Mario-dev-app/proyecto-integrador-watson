const express = require('express');
const sequelize = require('../db/connection');
const router = express.Router();
const Cita = require('../models/cita');
const Especialidad = require('../models/especialidad');
const Paciente = require('../models/paciente');
const Turno = require('../models/turno');
const enviarCorreo = require('../utils/enviar-correo');
const generarCorrelativo = require('../utils/generar-correlativo');
const obtenerPosiblesDias = require('../utils/get-posibles-dias');
const { Op } = require("sequelize");

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

/* Obtener citas paginadas*/
router.get('/citas', (req, res) => {
    let limit = req.query.limit;
    let offset= req.query.offset;
    Cita.findAll({limit: limit, offset: offset}).then((resp) => {
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

    const paciente = await Paciente.findOne({where: {dni: dni}});

    const ultimoID = await Cita.findOne({attributes: ['id'] ,order: [['id', 'DESC']]});

    let numeroCorrelativo;
    if(ultimoID){
        numeroCorrelativo = ultimoID.id;
    }else{
        numeroCorrelativo = 0;
    }

    const correlativo = generarCorrelativo(numeroCorrelativo + 1);

    const codigoEspecialidad = await Especialidad.findOne({ attributes: ['codigo'], where: { nombre: especialidad } });
    const codigoTurno = codigoxHora.filter(turnoResp => {
        if (turnoResp.hora == turno) {
            return turnoResp.codigo;
        }
    });

    Cita.create({
        dni: dni,
        especialidad: codigoEspecialidad.codigo,
        turno: codigoTurno[0].codigo,
        fecha: fecha,
        codigo: correlativo
    }). then(() => {
        enviarCorreo(paciente.nombre, paciente.apellidos, dni, paciente.correo, correlativo, especialidad, turno, fecha);
        res.json({
            ok: true,
            message: `Se registró correctamente la cita. Su código de cita es ${correlativo}`
        });
    }).catch(() => {
        res.json({
            ok: false,
            message: 'Hubo un error al momento de registrar la cita'
        });
    });

});

/* Modificar el estado de la cita */
router.put('/modificar-estado-cita', (req, res) => {
    let id = req.body.id;
    let atendida = req.body.atendida;
    Cita.update({atendida: !atendida}, {where: { id: id }}).then(() => {
        res.json({
            ok: true,
            message: 'Estado de la cita modificado correctamente'
        });
    }).catch((err) => {
        res.json({
            ok: false,
            message: err
        });
    });
});


/* Buscar cita por código y dni ADMIN PANEL*/
router.post('/buscar-cita', (req, res) => {

    let search = req.body.search;
    Cita.findAll({
        where: {
            [Op.or]: [
                {
                    dni: {[Op.like] : `%${search}%`}
                },
                {
                    codigo: {[Op.like] : `%${search}%`}
                }
            ]
        }
        })
    .then((resp) => {
        res.json({
            ok: true,
            data: resp
        });
    }).catch((err) => {
        res.json({
            ok: false,
            error: err
        });
    });
});

/* Buscar cita por código */
router.post('/buscar-cita-por-codigo', (req, res) => {
    /*
    #swagger.responses[200] = {
        description: 'Retorna la cita encontrada',
        content: {
            "application/json": {
            schema: { $ref: "#/components/schemas/Cita" } 
            }
        }
    }
    */
   /*
   #swagger.parameters['codigo'] = {
        in: 'body',
        description: 'Codigo de la cita',
        schema: { dni: '000001'}
   }
   */
    let codigo = req.body.codigo;
    Cita.findOne({
        where: {
            codigo: {[Op.like]: `${codigo.trim()}`}
        }
    }).then( async (resp) => {
        if(!resp){
            return res.send(resp);
        }

        let {codigo, hora} = codigoxHora.find((t) => {
            return t.codigo == resp.turno
        });
        let esp = await Especialidad.findOne({where: {codigo: resp.especialidad}});
        let cita = {
            turno: hora,
            especialidad: esp.nombre,
            fecha: resp.fecha,
            dni: resp.dni,
            codigo: resp.codigo
        };
        res.send(cita);

    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router;