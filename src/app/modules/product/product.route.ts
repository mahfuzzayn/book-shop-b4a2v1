import express from 'express'
import { productControllers } from './product.controller';
const router = express.Router();

router.get('/', productControllers.getAllProducts);

router.get('/:productId', productControllers.getSingleProduct);

router.put('/:productId', productControllers.updateProduct);

router.post('/', productControllers.createProduct);

export const ProductRoutes = router;