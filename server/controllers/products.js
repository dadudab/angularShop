const Product = require('../models/product');

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.createProduct = async (req, res) => {
  const userId = req.user._id;
  const { name, description, price, imageUrl, categories } = req.body;

  try {
    const newProduct = new Product({
      user: userId,
      name,
      description,
      price,
      imageUrl,
      categories,
    });

    await newProduct.save();
    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

// /user/34/products

module.exports.getUserProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const products = await Product.find({ user: userId });
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

// module.exports.getProduct = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const foundProduct = await Product.findOne({ _id: productId });
//     if (!foundProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     return res.status(200).json(foundProduct);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Something went wrong' });
//   }
// };
