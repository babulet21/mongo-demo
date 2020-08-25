const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>console.log('database connected .....'))
    .catch(err=>console.error('unable to connect to the database.....'));

const courseSchema = new mongoose.Schema({
    tags:[String],
    date:Date,
    name:String,
    author:String,
    isPublished:Boolean,
    price:Number

});

const Course = mongoose.model('course',courseSchema);

async function getCourse(){
   return await Course.find({isPublished:true})
        .or([{price:{$gte:15}},{name:/.*by.*/i}])
}

async function run(){
    const result = await getCourse();
    console.log(result);
}

run();
