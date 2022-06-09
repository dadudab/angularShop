const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getUserOrders, getSoldProducts } = require('../controllers/orders');
const { isAuth, validateOrder } = require('../middlewares');

router.post('/orders/new', isAuth, createOrder);
router.get('/orders', getOrders);
router.get('/orders/my-orders', isAuth, getUserOrders);
router.get('/orders/sold-products', isAuth, getSoldProducts);

module.exports = router;
