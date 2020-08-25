const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground_1')
    .then(()=>console.log('connected to mongodb database ......'))
    .catch(err=>console.error('unable to connect to mongodb......'))

const courseSchema = new mongoose.Schema({
    name: {type: String,
          required: true,
          minlength:5,
          maxlength:255
        },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync:true,
            validator: function(v,callback) {
                setTimeout(()=>{
                    // Do some async work.
                    const result = v && v.length > 0;
                    callback(result);
                },8000)                
            },
            
            message: 'A course should have atleast one tag.'
        }
    },
    date: {type: Date , default: Date.now},
    isPublished: Boolean,
    price:{
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 250
    },

    catagory: {
        type: String,
        required: true,
        enum: [ 'web', 'mobile', 'network']
    }
});

const Course = mongoose.model('course',courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular course',
        author: 'Mosh',
        tags: [],
        isPublished: true,
        price:10,
        catagory:'-'
    });
    
    try{
        await course.validate()
        /**const result = await course.save();
        console.log(result);**/
    }

    catch(ex){
       for(field in ex.errors)
        console.log(ex.errors[field].message)
    }
    
}

async function getCourse(){
    const courses = await Course
        //.find({ author: 'Mosh', isPublished: true})
        //.find({ price: { $gte: 10 , $lte: 20 } })
        //.find({ pirce: { $in: [10, 15, 20] } })
        //starts with Mosh
        //.find({ author: /^Mosh/ })
        // Ends with Mosh
        //.find({ author: /Mosh$/i })
        //if it contains the word mosh anywhere in the sentence    
        //.find({ author: /.*Mosh.*/i })
        .or([ { author: 'Mosh' }, {isPublished: true } ])
        .limit(10)
        .sort({ name:1 })
        .select({ name:1, tags:1 });

    console.log(courses);
}

/**async function updateCourse(id){
    const course = await Course.findById(id)
    if(!course) return;

    course.isPublished = true;
    course.name = 'Anothe name'

    const result = await course.save();

    console.log( result );
}

updateCourse('5e84ed8708ece6190c07214c');**/

/**async function updateCourse(id){
    const result = await Course.update({_id:id},{
        $set:{
            isPublished: false,
            name: 'Mosh'
        }        
    });

    console.log(result);
}

updateCourse('5e84ed8708ece6190c07214c');**/

async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            isPublished: false,
            author: 'jason'
        }
    },{new: true});

    console.log( course );
}

async function removeCourse(id){
    //const result = await Course.deleteOne({_id:id})
    //const result = await Course.deleteMany({_id:id})
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

//removeCourse('5e84ed8708ece6190c07214c');

createCourse();