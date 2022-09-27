const express = require('express');
const app = express();

app.use(require('./paciente'));

module.exports = app;