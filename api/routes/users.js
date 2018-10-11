'use strict';

import express from 'express';
import * as usersController from '../controllers/usersController';

let router = express.Router();

router.post('/login', usersController.login);
router.post('/registry', usersController.registry);

export default router;
