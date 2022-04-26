const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    city,
    address,
    postalCode,
    username,
    email,
    password,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      city,
      address,
      postalCode,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        city: newUser.city,
        address: newUser.address,
        postalCode: newUser.postalCode,
        username: newUser.username,
        email: newUser.email,
        tokenExpiresIn: 3540,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      _id: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      city: existingUser.city,
      address: existingUser.address,
      postalCode: existingUser.postalCode,
      username: existingUser.username,
      email: existingUser.email,
      tokenExpiresIn: 3540,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.status(200).json({ token });
};
