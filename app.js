const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use(require('./routes/routes'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor levantado');
});

