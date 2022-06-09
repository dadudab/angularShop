const Cart = require("../models/cart");
const Order = require("../models/order");

module.exports.createOrder = async (req, res) => {
   const userId = req.user._id;
   const { merchantData, shippingData } = req.body; 
   
   try {
      const cart = await Cart.findOne({ user: userId })
      // .populate('user')
      .populate({
         path: 'products',
         populate: {
            path: 'product',
            model: 'Product'
         }
      });

      // console.log(cart.products);

      // console.log(req.user);

      if(!cart) {
         return res.status(404).json({ message: 'Cannot find cart' });
      }

      if(cart.totalProducts === 0 || cart.totalAmount === 0 || cart.products.length === 0) {
         return res.status(422).json({ message: 'No products to order' });
      }

      // const productsToOrder = [];
      // for(let product of cart.products) {
      //    productsToOrder.push(product);
      // }

      // console.log('user ' + req.user);

      const newOrder = new Order({
         userId,
         merchantData: {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: merchantData.email,
            phoneNumber: merchantData.phoneNumber,
         },
         shippingData,
         products: [...cart.products],
         totalAmount: cart.totalAmount,
         totalProducts: cart.totalProducts
      });
      await newOrder.save();

      cart.totalProducts = 0;
      cart.totalAmount = 0;
      cart.products = [];

      await cart.save();

      // console.log(newOrder);
      // console.log(cart);
      // console.log('id' + userId);
      // console.log(cart);
      return res.status(200).json(newOrder);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong' });
   }
}

module.exports.getOrders = async (req, res) => {
   try {
      const orders = await Order.find({}).populate({ path: 'products', populate: { path: 'product', model: 'Product'}})
      return res.status(200).json(orders);
   } catch (error) {
      console.log(error);
   }
}

module.exports.getUserOrders = async (req, res) => {
   const userId = req.user._id.toString();

   try {
      const userOrders = await Order.find({ userId }).populate({
         path: 'products',
         populate: {
            path: 'product',
            model: 'Product',
         }
      })
      

      return res.status(200).json(userOrders);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong' });
   }
}

module.exports.getSoldProducts = async (req, res) => {
   const userId = req.user._id;
   console.log(userId);

   try {
      const orders = await Order.find({}).populate({
         path: 'products',
         populate: {
            path: 'product',
            model: 'Product'
         }
      });

      // console.log(orders.products);

   let soldProducts = [];
   let shippingData = {};

   for(let order of orders) {
      for(let product of order.products) {
         if(product.product.user.equals(userId)) {
            soldProducts.push(product);
            shippingData = order.shippingData;
         }
      }
   }

   const totalOrders = [];
   const order = {
      soldProducts,
      shippingData
   }
   totalOrders.push(order);

   return res.status(200).json(totalOrders);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong' });
   }
}
