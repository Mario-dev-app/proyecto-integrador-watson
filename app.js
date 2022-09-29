const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./db/connection');

app.use(express.json());

app.use(cors());

app.use(require('./routes/routes'));

/* Database */
sequelize.authenticate().then(() => {
    console.log('Base de datos ONLINE');
}).catch((err) => {
    console.log(err);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor levantado');
});

