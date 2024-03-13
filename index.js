// Mongoose gives us a simple API to work with mongoDB
const mongoose = require('mongoose'); // return a mongoose object
mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
// 'mongodb://localhost/playground' reference to mongoDB that we install on this machine. When you wanna deploy your application to production environment, you are going to have different connection string for the production environment. You can set various configuration for different environments using config module.
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

// Now we need to compile courseSchema into a model. What is a model? In this application we wanna have a class called Course and then we should able to create instances of that class like node course. And then we can save that node course our database. So create a class like course we need to compile courseSchema into a model.

// mongoose object that we have has a method called model that takes 2 arguments. The first argument is the singular name of the collection that this model is for. So in out mongoDB database we wanna have collection called courses. So mongoose.model(‘Course’,).
// The second argument is the schema that defines the shape of document in this collection so that is courseSchema. const Course =  mongoose.model(‘Course’,courseSchema ).

// Once we have a schema we need to compile that to a model which gives us a class. Next we can create an object based on that class and this object maps to a document in a mongoDB database.

const Course = mongoose.model('Course', courseSchema);

// Here we are dealing with async operation. Because, it is going to take sometimes save this course into database. Because, we are going to access to file system. That’s why we are going to dealing with async operation. The result of this operation will be ready in the future. So this method returns a promise. We can await it and get the result. that is result is the actual course object that is saved in the database.
async function createCourse() {
  const course = new Course({
    name: 'React.js Course',
    author: 'Ibrahim',
    tags: ['react', 'frontend'],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
