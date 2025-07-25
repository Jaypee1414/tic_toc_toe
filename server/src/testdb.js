require('dotenv').config(); 
const mongoose = require('mongoose');

const testDBConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connection successful');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection failed:');
    console.error(error.message);
    process.exit(1); 
  }
};

testDBConnection();
