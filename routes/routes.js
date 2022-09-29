const express = require('express');
const app = express();

app.use(require('./paciente'));
app.use(require('./especialidad'));

module.exports = app;