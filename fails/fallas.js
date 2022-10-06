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