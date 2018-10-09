'use strict'

import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

import { port } from './api/helpers/config';
import usersRoutes from './api/routes/users';

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/ticket-checker/auth', usersRoutes);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
