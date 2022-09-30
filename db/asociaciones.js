const Especialidad = require('../models/especialidad');
const Paciente = require('../models/paciente');

Paciente.hasOne(Especialidad);

Especialidad.belongsTo(Paciente);