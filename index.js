// Mongoose gives us a simple API to work with mongoDB
const mongoose = require('mongoose'); // return a mongoose object
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
// This reference to mongoDB that we install on this machine. When you wanna deploy your application to production environment, you are going to have different connection string for the production environment. You can set various configuration for different environments using config module.
// mongoose.connect() returns promise object.
