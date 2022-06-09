const { userSchema, productSchema, orderSchema } = require('./schema');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Product = require('./models/product');

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(422).json({ message: error.message });
  }
  return next();
};

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(422).json({ message: error.message });
  }
  return next();
};

module.exports.validateOrder = (req, res,next) => {
  const { error } = orderSchema.validate(req.body);

  if(error) {
    return res.status(422).json({ message: error.message });
  }
  return next();
}

module.exports.isAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedToken._id);
      console.log(req.user);

      return next();
    }

    return res.status(401).json({ message: 'User not auth - no token' });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'User not auth' });
  }
};

module.exports.isUserOwner = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.user._id.equals(user._id)) {
      return res
        .status(405)
        .json({ message: 'You are not allowed to do this' });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.isProductOwner = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!foundProduct.user.equals(req.user._id)) {
      return res.status(405).json({ message: 'Not allowed' });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
