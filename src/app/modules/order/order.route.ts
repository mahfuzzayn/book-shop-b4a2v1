import express from 'express'
import { orderControllers } from './order.controller';
const router = express.Router();

router.post('/', orderControllers.orderProduct);

// router.get('/revenue', productControllers.getSingleProduct);

export const OrderRoutes = router;