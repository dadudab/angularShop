const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
      },
      amount: {
        type: Number,
        default: 1,
      },
      _id: {
        _id: false,
      },
    },
  ],
  totalProducts: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
