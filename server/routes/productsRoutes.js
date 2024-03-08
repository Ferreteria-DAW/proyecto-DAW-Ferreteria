const { Router } = require('express');

const { getProducts, getProduct, getProductsByCategory,getUserProducts, createProduct, editProduct, deleteProduct } = require('../controllers/productController');
const authMiddlware = require('../middleware/authMiddleware');

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/categories/:category', getProductsByCategory);
router.get('/users/:id', getUserProducts);
router.post('/', authMiddlware, createProduct);
router.patch('/:id', authMiddlware, editProduct);
router.delete('/:id', authMiddlware, deleteProduct);

module.exports = router;