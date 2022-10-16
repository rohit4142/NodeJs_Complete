const express= require('express')
const app=express()
//we need to require mongoose.js for database connection and respective models
require('./db/mongoose.js')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000

//registering a custom middleware function
//this fun will run bw new request and route handler
// app.use((req,res,next)=>{
//     //console.log(req.method, req.path)
   
//     //suppose you want to allow anyother request other than "GET"

//     if(req.method=='GET')
//     {
//         res.send("GET request is disabled")
//     }
//     else{
//       //if we don't call next() our route handler is never going to run and status only will be loading
//     next()
//     }
// })

//create a middleware in case your site is under maintainance
// app.use((req,res,next)=>{
//     res.send("Site is under maintainance ::we will get back to you soon")
// })

//we have created a separate middleware folder to handle middleware throughtout the application


//to parse incoming json data into object use below code
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//using middleware

//Without middleware:  new request->run route handler

//with middleware : new request->do something  ->run route handler
//with middleware in place we can restrict some request that can only be performed by authorized user

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//we are going to fetch the details of author using task id

const Task=require('./models/task')
const User=require('./models/user')



const main = async()=>{
    //here we are finding the user based on task
    //const task= await Task.findById('634bb48fe13200fdeba7fb80')
    //to get the author details we will populate method
   // await task.populate('author') //if we don't use this line we will get only user id
    //console.log(task.author)

    //but in reality we need all tasks by a user
    const user=await User.findById('634bb449e13200fdeba7fb78')
    await user.populate('tasks')
    console.log(user.tasks)
}
main()

