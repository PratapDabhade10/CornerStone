const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI); // debug line
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'CornerStone API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

