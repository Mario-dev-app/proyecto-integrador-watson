const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./db/connection');
const setEspecialidades = require('./utils/set-especialidades');
const setTurnos = require('./utils/set-turnos');
const setPacientes = require('./utils/set-pacientes');
const setFakeReniec = require('./utils/set-fake-reniec');
const setCitas = require('./utils/set-citas');
const setUsuarios = require('./utils/set-usuarios');

app.use(express.json());

app.use(cors());

app.use(require('./routes/routes'));

/* Database */
sequelize.authenticate().then(() => {
    console.log('Base de datos ONLINE');
}).catch((err) => {
    console.log(err);
});

(async() => {
    await sequelize.sync({force: true});
    setEspecialidades();
    setTurnos();
    setPacientes();
    setFakeReniec();
    setCitas();
    setUsuarios();
})();

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor levantado');
});

