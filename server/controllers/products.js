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
  const { name, description, image, price, categories } = req.body;

  try {
    const previousProduct = await Product.findById(productId);
    if (!previousProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }


    if(!image.imageString) {
      const product = {
        _id: productId,
        name,
        price,
        description,
        categories,
        image
      }

      const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true });
      await updatedProduct.save();
      return res.status(200).json(updatedProduct);
    }

    if(image.imageString) {

      // if user update image
      await cloudinary.uploader.destroy(previousProduct.image.imageId);
      // console.log(previousProduct.image.imageId);
      
      
      const cloudinaryResponse = await cloudinary.uploader.upload(image.imageString);
      console.log(cloudinaryResponse);
      
      const product = {
        _id: productId,
        name,
        price,
        description,
        categories,
        image: {
          imageUrl: cloudinaryResponse.url,
          imageString: null,
          imageId: cloudinaryResponse.public_id
        }
      };
      
      const updatedProduct = await Product.findByIdAndUpdate(productId, product);
      return res.status(200).json(updatedProduct);
    }
      
      



    // const updatedProduct = {
    //   // ...previousProduct,
    //   name,
    //   description,
    //   imageUrl,
    //   price,
    //   categories,
    // };
    // const newProduct = await Product.findByIdAndUpdate(
    //   productId,
    //   updatedProduct,
    //   { new: true }
    // );

    // await newProduct.save();
    // return res.status(200).json(newProduct);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(productId);
    const products = await Product.find({ user: userId })
      .populate('user');
    // console.log(products);
    return res.status(200).json(products);
    // return res.status(200).json({ message: 'Product deleted' });
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
  let electronicProducts = 0;

  try {
    const total = await Product.countDocuments({ user: userId });
    const totalProducts = await Product.find({ user: userId });

    for(let product of totalProducts) {
      if(product.categories[0] === 'garden') {
        gardenProducts += 1;
      }
      else if(product.categories[0] === 'cars') {
        carsProducts += 1;
      }
      else if(product.categories[0] === 'home') {
        homeProducts += 1;
      }
      else if(product.categories[0] === 'electronic') {
        electronicProducts += 1;
      }
    }

    console.log(gardenProducts + ' garden');
    console.log(carsProducts + ' cars');
    console.log(homeProducts + ' home');
    console.log(electronicProducts + ' electronic');

    return res.status(200).json({
      totalProducts: total,
      gardenProducts,
      carsProducts,
      homeProducts,
      electronicProducts
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
