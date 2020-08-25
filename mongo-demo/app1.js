const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('connected to the database.....'))
    .catch(errr=>console.error('failed to connect.....'))
 
const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    isPublished:Boolean,
    price:Number,
    date:{type:Date, default:Date.now}
});

const Courses = mongoose.model('course', courseSchema)

async function updateCourse(id){
    const course = await Courses.findByIdAndUpdate(id,{
        $set:{
            author:'teddy',
            isPublished:true
        }
    },{new:true})   
 
    console.log(course);
}
 

async function removeCourse(id){
    const course = await Courses.deleteOne({_id:id})
    console.log(course)
}
removeCourse('5e29a6e47238f135b0bd04ca');