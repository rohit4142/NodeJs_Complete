const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const User=require('../../src/models/user')

//creating a variable of object id for a user
const userOneId= new mongoose.Types.ObjectId()

const userOne={
    _id:userOneId,
    name:'Rohit',
    email:'rk7604577774@gmail.com',
    age:27,
    password:'6767david',
    tokens:[{
        token: jwt.sign({
            _id:userOneId
        },process.env.JWT_SECRET)
    }]
}

const setUpDatabase=async()=>{
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports={
    userOne,
    userOneId,
    setUpDatabase
}