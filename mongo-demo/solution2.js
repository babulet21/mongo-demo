const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>console.log('mongodb connected......'))
    .catch(err=>console.error('failed to connect......'));

const courseSchema = new mongoose.Schema({
    tags:[String],
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    date:{type:Date, default:Date.now}
});

const Courses = mongoose.model('course',courseSchema);
 
async function getCourse(){
    return await Courses
        .find()
        .and([{isPublished:true},{tags:{$in:['backend','frontend']}}])
        .sort('-price')
        .select('name author price')       
}

async function run(){
    const result = await getCourse();
    console.log(result)
}

run();

