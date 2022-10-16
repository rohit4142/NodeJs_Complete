const mongoose=require('mongoose')
const User=require('./user')

const Task = mongoose.model('Task', {
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
})

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