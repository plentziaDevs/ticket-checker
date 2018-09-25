const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/prueba', (req, res) => {
    res.status(200).send({
        prueba: 'to bien en el json'
    });
});

app.listen('4444', () => console.log('to bien'));