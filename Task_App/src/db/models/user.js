const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')


//creating a schema so that we can use middlewares : Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions.Mongoose has 4 types of middleware: document middleware, model middleware, aggregate middleware, and query middleware.

const userSchema= new mongoose.Schema({name: {
    type: String,
    required: true,
    trim:true
},
age: {
    type: Number,
    default:0, //if you don't provide age it use 0.
        //adding custom validate
        validate(value){
             if(value<0)
             {
                 throw new Error('Age must be positive number');
             }
}
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    lowercase:true,
    validate(value){
        if(!validator.isEmail(value))
        {
            throw new Error('Email is not valid')
        }
    }
 },
 password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
        if (value.toLowerCase().includes('password')) {
            throw new Error('Password cannot contain "password"')
        }
    }
}

})


userSchema.methods.generateAuthToken=async function(){
    const user =this
    const token= jwt.sign({ _id: user._id.toString()},"mynameisrohit")
    return token
}


//login logic
userSchema.statics.findByCredentials=async(email,password)=>{
    const user= await User.findOne({email})
    if(!user)
    {
        throw new Error ('unable to log in')
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error ('unable to log in')
    }

    return user
}



//to do something before the document is saved use pre method
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password'))
    {
     user.password=await bcrypt.hash(user.password,8)   
    }
})

const User=mongoose.model('User',userSchema)

module.exports=User

// const me= new User({
//     name:'David3',
//     age:23,
//     password:"1234jisddsdhfsfhdk",
//     email:'david23@hotmail.com'
// })
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })