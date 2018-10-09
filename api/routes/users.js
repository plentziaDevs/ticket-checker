'use strict';

import express from 'express';
import * as usersCtrl from '../controllers/usersCtrl';

const router = express.Router();

router.post('/login', usersCtrl.login);

export default router;
