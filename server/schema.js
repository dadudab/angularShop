const Joi = require('joi');

module.exports.userSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  city: Joi.string().min(1).required(),
  address: Joi.string().min(1).required(),
  postalCode: Joi.string().min(1).required(),
  username: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
}).required();

module.exports.productSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  price: Joi.number().min(1).required(),
  image: Joi.object().required(),
  categories: Joi.array().items(Joi.string().min(1)),
}).required();

module.exports.orderSchema = Joi.object({
  merchantData: Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
    phoneNumber: Joi.string().required()
  }).required(),
  shippingData: Joi.object({
    city: Joi.string().min(1).required(),
    address: Joi.string().min(1).required(),
    postalCode: Joi.string().min(1).required(),
  }).required(),
  cart: Joi.object(),
});
