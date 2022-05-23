const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  getUserProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');
const {
  isAuth,
  validateProduct,
  isUserOwner,
  isProductOwner,
} = require('../middlewares');

router.post('/products/new', isAuth, validateProduct, createProduct);
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/users/:userId/products', getUserProducts);
router.put(
  '/products/:productId/update',
  isAuth,
  isProductOwner,
  validateProduct,
  updateProduct
);
router.delete(
  '/products/:productId/delete',
  isAuth,
  isProductOwner,
  deleteProduct
);

module.exports = router;

// admin 2-------------
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU5YjgyMWUyNzczOTg5YTIwN2Y2ZjQiLCJpYXQiOjE2NTAxMDQwOTgsImV4cCI6MTY1MDEwNzY5OH0.Vzd_f-KiyKQ_K_wz4tifL3aQozd9grm1-d0xlZii-Fs
// 6259b821e2773989a207f6f4

// admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU5NzRmYmIwZDdkZTIwODE1NzY1MGUiLCJpYXQiOjE2NTAxMDQwNzYsImV4cCI6MTY1MDEwNzY3Nn0.4c41wtEDK4g2_SWYFwc3ASNW4RlBJlMwbnf2YVbPA5w
// 625974fbb0d7de208157650e

// 6259b5f5e288de7f31c83d52
// admin product

// 6259b858e2773989a207f6f8
// admin 2 product
