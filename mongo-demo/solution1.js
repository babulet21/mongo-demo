const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>console.log('database connected......'))
    .catch(err=>console.error('failed to connect'))

const courseShema = new mongoose.Schema({
    tags:[String],
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Courses = mongoose.model('course',courseShema)

async function getCourses(){
        return await Courses
        .find({isPublished:true,tags:'backend'})
        .sort({name:1})
        .select({name:1,author:1})
}

 async function run(){
    const result = await getCourses();
    console.log(result)
 }

 run();

