const mongoose = require('mongoose')

// Connection URL

const connectDB = (url) =>{
    
    // Connect to the database
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
      // Get the default connection
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
      console.log('Connected to MongoDB');
    });
}

module.exports = connectDB