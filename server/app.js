const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

// cors config
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

// json config
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
