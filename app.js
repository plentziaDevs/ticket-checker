import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';
import db from './api/database/connection';
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/prueba', (req, res) => {
    res.status(200).send({
        prueba: 'to bien en el json'
    });
});

app.listen('4444', () => console.log('to bien'));