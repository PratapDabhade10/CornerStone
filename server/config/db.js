const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to:', process.env.MONGO_URI); // debug line
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;