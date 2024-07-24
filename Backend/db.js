const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/Artisans';

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        
      });
      console.log('MongoDB database connection established successfully');
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      return false;
    }
  };

module.exports = connectToMongo;
