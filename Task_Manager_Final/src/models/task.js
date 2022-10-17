const mongoose=require('mongoose')
const User=require('./user')

const taskSchema= new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
},{
    timestamps:true
})

const Task = mongoose.model('Task',taskSchema)

module.exports=Task

// const task = new Task({
//     description: 'clean up',
//     completed:true
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })