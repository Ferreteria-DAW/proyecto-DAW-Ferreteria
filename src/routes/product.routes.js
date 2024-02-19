import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from '../controllers/product.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createProductSchema } from '../schemas/product.schema.js';

const router = Router();

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

router.post('/products', authRequired,  createProduct);

router.put('/products/:id', authRequired, validateSchema(createProductSchema), updateProduct);

router.delete('/products/:id', authRequired, deleteProduct);

export default router;