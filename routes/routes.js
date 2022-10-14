const express = require('express');
const app = express();

app.use(require('./paciente'));
app.use(require('./especialidad'));
app.use(require('./turno'));
app.use(require('./cita'));
app.use(require('./fakeReniec'));
app.use(require('./usuario'));

module.exports = app;