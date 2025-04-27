import { Router } from 'express';

import {
  getSales,
  getSale,
  getSalesByParams,
  createSale,
  // updateVenta,
} from '../controller/sales.controller.js';

const router = Router();

router.get('/sales', getSales);
router.get('/sales/:id', getSale);
router.post('/sale', createSale);
router.post('/sales/byparams', getSalesByParams);
// router.put('/sales/:id', updateVenta);

export default router;
