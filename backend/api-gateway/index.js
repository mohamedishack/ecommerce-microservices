const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://deen:Deen123@cluster0-shard-00-00.s25px.mongodb.net:27017,cluster0-shard-00-01.s25px.mongodb.net:27017,cluster0-shard-00-02.s25px.mongodb.net:27017/?ssl=true&replicaSet=atlas-w1es46-shard-0&authSource=admin&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Gateway running');
});


app.post('/auth/register', async (req, res) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/register',
      req.body
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Auth service error' });
  }
});

// Forward login request to Auth Service
app.post('/auth/login', async (req, res) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/login',
      req.body
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Auth service error' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(
      'http://localhost:3002/products',
      { params: req.query }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Product service error' });
  }
});

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});