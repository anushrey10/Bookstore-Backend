const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Set mongoose connection options with longer timeouts
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    
    // More detailed error information
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to any MongoDB server.');
      console.error('Please check:');
      console.error('1. Your network connection');
      console.error('2. MongoDB Atlas IP whitelist settings');
      console.error('3. Username and password in connection string');
    }
    
    // Exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;