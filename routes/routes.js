const express = require('express');
const app = express();

app.use(require('./paciente'));
app.use(require('./especialidad'));
app.use(require('./turno'));
app.use(require('./cita'));

module.exports = app;