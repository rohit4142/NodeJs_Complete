//npm i mongoose
const mongoose = require('mongoose')

//!mongoose.connect is used to connect with the database.
/*
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')
this is the minimum required to connect to databse.
You can also add options and callback fun which will retiurn a 
promise.
to know more about connections visit below link:
https://mongoosejs.com/docs/connections.html
*/
//'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})

//!Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and 
//reading documents from the underlying MongoDB database.
/*
to learn about models visit below link
https://mongoosejs.com/docs/models.html
Note: The .model() function makes a copy of schema. Make sure that you've added everything you want 
to schema, including hooks, before calling .model()!
*/
//const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })
//creating an instance of model
// const me= new User({
//     name:'Rohit',
//     age:22
// })

// //saving the document and it will return a promise.
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

//creating another model

// const task=mongoose.model('task',{
//     task_desc:{
//         type: String
//     },
//     completed:{
//         type:Boolean
//     }
// })

// const first_task=new task({
//     task_desc:"Clean up the phone",
//     completed:false
// })

// first_task.save().then(()=>{
//     console.log(first_task)
// }).catch((error)=>{
//     console.log(error)
// })

//!DATA VALIDATION AND SANITIZATION
//we can enforce some rules on data and data sanitization allow us to alter the data before saving them.
// Validation is defined in the SchemaType
// Validation is middleware. Mongoose registers validation as a pre('save') hook on every schema by default.
// You can disable automatic validation before save by setting the validateBeforeSave option
// You can manually run validation using doc.validate(callback) or doc.validateSync()
// You can manually mark a field as invalid (causing validation to fail) by using doc.invalidate(...)
// Validators are not run on undefined values. The only exception is the required validator.
// Validation is asynchronously recursive; when you call Model#save, sub-document validation is executed as well. If an error occurs, your Model#save callback receives it
// Validation is customizable



//for better formatting i have moved all model code into model folder