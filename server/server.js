
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();


connectDB();

const app = express();
app.use(cors());
app.use(express.json());



// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CornerStone API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));