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

// Let me show you how to retrieve documents from a mongoDB database. Course class that we define earlier has bunch of methods for querying documents. We have find method to get list of documents, we have findById which is pretty self explanatory and we have findOne which returns single document. There are few different methods, we are going to look at them later. Let’s look at find method. This method return DocumentQuery object which is kind of promise object. So it has then method. So we can await it and get the result With this we get all the courses in our database.

// We can also pass the filter in here. As the first argument to the find method. We pass an object and in this object we add one or more key value pairs for filtering. Let’s say we wanna get only the courses from ‘Ibrahim’.

// We can pass another property (another filter) isPublished: true. So with this filter we only get the published courses by ‘Ibrahim’. So this is how we retrieve documents.Course.find({author: 'Ibrahim'})

// We can set a limit on the number of documents that are returned. Course.find({ author: 'Ibrahim' }).limit(10)

// We can also select specific property in the document. Let’s say our course documents have 50 properties. Maybe we don’t wanna return all these properties to the client. Perhaps we wanna return their name. Let me show you how to build more complex query.                              Course.find({ author: 'Ibrahim' }).select({ name: 1, tags: 1 });

// You saw that this find method returns a DocumentQuery object. So we can customize this query. We can apply a limit(10), we can sort the documents using sort() method. We can add one or more key value pairs for sorting in object which is parameter of sort method. Let say we wanna sort these documents by their name. sort({ name: 1 }). ‘1’ indicates ascending order. If you wanna sort these documents descending order you use ‘-1’. We also have another method select(). And with this we can select the property that we want to return. For example, we only wanna get the name and tags property of each course document. select({ name:1, tags: 1}).

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to )
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)

async function getCourses() {
  const courses = await Course

    // This returns count of documents that match this { author: 'Ibrahim', isPublished: true } critera
    .find({ author: 'Ibrahim', isPublished: true })
    .count()

    // In belove, we getting courses who is author is exactly 'Ibrahim'
    // If we have a course with auther Ibrahimfegh or Ibrahim Tekfidan,those courses will not be return.
    // If we wanna have more control over strings, you need to use regular expression
    // /pattern/ -> This is the syntax for representing a regex.
    // .find({ author: 'Ibrahim' })

    // Starts with Ibrahim
    // .find({ author: /^Ibrahim/ })

    // Ends with Tekfidan
    // .find({ author: /Tekfidan$/i })
    // By default regex queries case sensitive. If you make it case insensitive, we append 'i' at the end.

    // Contains Ibrahim
    // .find({ author: /.*Ibrahim.*/i })

    // each object is a filter. Just like the filter object that we pass to the find method.
    // .or([{ author: 'Ibrahim' }, { isPublished: true }])
    // The and logical operator is exactly the same. So instead of using the or method we use find().and() method.with this we pass array of filter objects. This is technically similar to passing a filter object to the find method. But sometimes in more complex queries, you may find a place for using the and method
    // .and()
    // .find({ price: 10 }) // course that are equal to 10 dollars
    // $ sign to indicate that this is an operator
    // .find({ price: { $gt: 10 } }) // course that are greater than 10 dollars
    // .find({ price: { $gt: 10, $lt: 20 } }); // course that are between 10 to 20 dollars
    // .find({ price: { $in: [10, 15, 20] } }); // course that are either 10 or 15 or 20 dollars
    .console.log(courses);
}
getCourses();

// createCourse();
