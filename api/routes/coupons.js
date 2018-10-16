import express from 'express';
import * as couponsController from '../controllers/couponsController';
import verification from '../middlewares/check_token';

const router = express.Router();

router.post('/create', verification, couponsController.create);

export default router;
