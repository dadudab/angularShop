const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/users');
// const {} = require('../controllers/products');
const { validateUser } = require('../middlewares');

router.post('/users/register', validateUser, registerUser);
router.post('/users/login', loginUser);
// router.get('/users/:userId/products', getUserProducts);
// router.put(
//   '/users/:userId/products/:productId/update',
//   isAuth,
//   isProductOwner,
//   validateProduct,
//   updateProduct
// );

module.exports = router;
