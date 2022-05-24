const Product = require('../models/product');
const { cloudinary } = require('../config/cloudinary');

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('user');
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate('user');

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
  const { name, description, price, image, categories } = req.body;

  try {
    const cloudinaryRes = await cloudinary.uploader.upload(image.imageString);
    console.log(cloudinaryRes);

    const newProduct = new Product({
      user: userId,
      name,
      description,
      price,
      image: {
        imageUrl: cloudinaryRes.url,
        imageId: cloudinaryRes.public_id,
        imageString: null
      },
      categories,
    });

    await newProduct.save();
    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

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

module.exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  //   console.log(productId);
  const { name, description, imageUrl, price, categories } = req.body;

  try {
    const previousProduct = await Product.findById(productId);
    if (!previousProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = {
      // ...previousProduct,
      name,
      description,
      imageUrl,
      price,
      categories,
    };
    const newProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProduct,
      { new: true }
    );

    await newProduct.save();
    return res.status(200).json(newProduct);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(productId);
    return res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.getUserProductsStats = async (req ,res) => {
  const userId = req.user._id;

  let gardenProducts = 0;
  let carsProducts = 0;
  let homeProducts = 0;

  try {
    const total = await Product.countDocuments({ user: userId });
    // const gardenProducts = await Product.countDocuments({ user})
    const totalP = await Product.find({ user: userId });
    for(let p of totalP) {
      if(p.categories[0] === 'garden') {
        gardenProducts += 1;
      }
      else if(p.categories[0] === 'cars') {
        carsProducts += 1;
      }
      else if(p.categories[0] === 'home') {
        homeProducts += 1;
      }
    }

    console.log(gardenProducts + ' garden');
    console.log(carsProducts + ' cars');
    console.log(homeProducts + ' home');

    return res.status(200).json({
      totalProducts: total,
      gardenProducts,
      carsProducts,
      homeProducts
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
