'use strict'

import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

import { port } from './api/helpers/config';
import usersRoutes from './api/routes/users';
import couponsRoutes from './api/routes/coupons';

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/ticket-checker/auth', usersRoutes);
app.use('/ticket-checker/coupon', couponsRoutes);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
