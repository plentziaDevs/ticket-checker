import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

import { notFound } from './api/errors/errors';
import { port } from './api/helpers/config';
import usersRoutes from './api/routes/users';
import couponsRoutes from './api/routes/coupons';

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/ticket-checker/auth', usersRoutes);
app.use('/ticket-checker/coupon', couponsRoutes);

app.use(notFound);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
