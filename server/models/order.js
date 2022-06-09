const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   // user: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: 'User'
   // },
   userId: {
      type: String,
      required: true
   },
   merchantData: {
      // userId: {
      //    type: String,
      //    required: true
      // },
      firstName: {
         type: String,
         required: [true, 'First name must not be empty']
      },
      lastName: {
         type: String,
         required: [true, 'Last name must not be empty']
      },
      email: {
         type: String,
         required: [true, 'Email name must not be empty']
      },
      phoneNumber: {
         type: String,
         required: [true, 'Phone number must not be empty']
      }
   },
   shippingData: {
      city: {
         type: String,
         required: [true, 'City must not be empty']
      },
      address: {
         type: String,
         required: [true, 'Address must not be empty']
      },
      postalCode: {
         type: String,
         required: [true, 'Postal code must not be empty']
      },
   },
   // cart: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: 'Cart'
   // },
   products: {
      type: Array,
      required: true,
   },
   totalAmount: {
      type: Number,
      required: true,
   },
   totalProducts: {
      type: Number,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now
   }
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
