const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

// cors config
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.bodyParser({ limit: '50mb' }));

// json config
app.use(express.json({ limit: '50mb' }));

// dotenv config
require('dotenv').config();

// mongodb config
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongodb connection
const db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

// routes
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', orderRoutes);

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
