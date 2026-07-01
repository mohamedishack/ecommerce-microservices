const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://deen:Deen123@cluster0-shard-00-00.s25px.mongodb.net:27017,cluster0-shard-00-01.s25px.mongodb.net:27017,cluster0-shard-00-02.s25px.mongodb.net:27017/?ssl=true&replicaSet=atlas-w1es46-shard-0&authSource=admin&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const JWT_SECRET = 'secret123';

// Register
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.get('/', (req, res) => {
  res.send('Auth Service running');
});

// temporary login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});

app.listen(3001, () => {
  console.log('Auth Service running on port 3001');
});