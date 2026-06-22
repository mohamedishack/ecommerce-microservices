const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://deen:Deen123@cluster0-shard-00-00.s25px.mongodb.net:27017,cluster0-shard-00-01.s25px.mongodb.net:27017,cluster0-shard-00-02.s25px.mongodb.net:27017/?ssl=true&replicaSet=atlas-w1es46-shard-0&authSource=admin&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Product Service running');
});

const Product = require('./models/Product');

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.listen(3002, () => {
  console.log('Product Service running on port 3002');
});