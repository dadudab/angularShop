const express = require('express');
const router = express.Router();
const {
  getCarts,
  getCart,
  addProductToCart,
  deleteProductFromCart,
} = require('../controllers/carts');
const { isAuth } = require('../middlewares');

router.get('/carts', getCarts);
router.get('/cart', isAuth, getCart);
router.post('/cart/:productId/add', isAuth, addProductToCart);
router.delete('/cart/:productId/delete', isAuth, deleteProductFromCart);

module.exports = router;
