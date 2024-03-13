// Mongoose gives us a simple API to work with mongoDB
const mongoose = require('mongoose'); // return a mongoose object
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
// This reference to mongoDB that we install on this machine. When you wanna deploy your application to production environment, you are going to have different connection string for the production environment. You can set various configuration for different environments using config module.
// mongoose.connect() returns promise object.

// -------------------------------------------

// So we have connected to mongoDB database, next thing we need to do is to create a schema. We use the schema to define the shape of document within collection in mongoDB.
// Collection in mongoDB is like a table in relational database. Document in mongoDB is kind of similar to raw in a relational database.
// In mongoose we have the concept called schema. This just specific to mongoose, it is not part of MongoDB. We use a schema in mongoose to define the shape of documents in a mongoDB collection.
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  // date: Date,
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
