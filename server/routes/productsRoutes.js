const { Router } = require('express');

const { getProducts, getProduct, createProduct, editProduct, deleteProduct } = require('../controllers/productController');
const authMiddlware = require('../middleware/authMiddleware');

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/create-product', authMiddlware, createProduct);
router.patch('/:id', authMiddlware, editProduct);
router.delete('/:id', authMiddlware, deleteProduct);

module.exports = router;