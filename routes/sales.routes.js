import { Router } from 'express';

import {
  getVentas,
  getVenta,
  getVentasByUsuario,
  createVenta,
  updateVenta,
} from '../controller/sales.controller.js';

const router = Router();

router.get('/sales', getVentas);
router.get('/sales/:id', getVenta);
router.get('/sales/usuario/:id_usuario', getVentasByUsuario);
router.post('/sales', createVenta);
router.put('/sales/:id', updateVenta);

export default router;
