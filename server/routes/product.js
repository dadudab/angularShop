const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  getUserProducts,
} = require('../controllers/products');
const { isAuth, validateProduct, isUserOwner } = require('../middlewares');

router.post('/products/new', isAuth, validateProduct, createProduct);
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/user/:userId/products', isAuth, isUserOwner, getUserProducts);

module.exports = router;
