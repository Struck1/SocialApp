const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('Connect database...');
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
