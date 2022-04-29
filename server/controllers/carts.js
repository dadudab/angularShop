const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Product = require('../models/product');

module.exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    return res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products',
      populate: {
        path: 'product',
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cannot find your cart' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.addProductToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingCartItemIndex = userCart.products.findIndex((item) => {
      return item.product.toString() === productId;
    });

    const existingCartItem = userCart.products[existingCartItemIndex];

    if (!existingCartItem) {
      const updatedProducts = [
        ...userCart.products,
        {
          product: productId,
          amount: 1,
        },
      ];
      const updatedTotalProducts = userCart.totalProducts + 1;
      const updatedTotalAmount = userCart.totalAmount + foundProduct.price;

      userCart.products = updatedProducts;
      userCart.totalProducts = updatedTotalProducts;
      userCart.totalAmount = updatedTotalAmount;

      await userCart.save();
      return res.status(200).json(userCart);
    }

    const updatedCartItem = {
      product: existingCartItem.product,
      amount: existingCartItem.amount + 1,
    };
    const updatedTotalProduct = userCart.totalProducts + 1;
    const updatedTotalAmount = userCart.totalAmount + foundProduct.price;

    userCart.products[existingCartItemIndex] = updatedCartItem;
    userCart.totalProducts = updatedTotalProduct;
    userCart.totalAmount = updatedTotalAmount;

    await userCart.save();
    return res.status(200).json(userCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.deleteProductFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingCartItemIndex = cart.products.findIndex((item) => {
      return item.product.toString() === productId;
    });

    const existingCartItem = cart.products[existingCartItemIndex];
    if (!existingCartItem) {
      return res.status(404).json({ message: 'Product is not in your cart' });
    }

    if (existingCartItem.amount > 1) {
      const updatedCartItem = {
        product: existingCartItem.product,
        amount: existingCartItem.amount - 1,
      };
      const updatedTotalProducts = cart.totalProducts - 1;
      const updatedTotalAmount = cart.totalAmount - foundProduct.price;

      cart.products[existingCartItemIndex] = updatedCartItem;
      cart.totalProducts = updatedTotalProducts;
      cart.totalAmount = updatedTotalAmount;

      await cart.save();
      return res.status(200).json(cart);
    }

    const updatedCartItems = cart.products.filter((item) => {
      return item.product.toString() !== productId;
    });

    cart.products = updatedCartItems;
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
