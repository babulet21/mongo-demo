const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseid){
    const course = await Course.update({_id:courseid},{
        $unset: {
            'author': ''
        }
    })
}

async function addAuthor(courseid,author){
    const course = await Course.findById(courseid);
    course.authors.push(author);
    course.save()
}

async function removeAuthor(courseid, authorid){
    const course = await Course.findById(courseid)
    const author = course.authors.id(authorid);
    author.remove();
    course.save();
}
removeAuthor('5e98373f7c7d290fcc180045','5e983b1a4c662e03285a0c0f');

//updateCourse('5e982295e199a82bc8314040');
/**createCourse('Node Course', [
    new Author({ name: 'yonas' }),
    new Author({ name: 'babulet' })
]);**/
