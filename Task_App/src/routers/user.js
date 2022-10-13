const express= require('express')
const { findById } = require('../db/models/user')
const User=require('../db/models/user')
var jwt = require('jsonwebtoken');
const router= new express.Router()
//adding a post method to create a resource
router.post('/users',(req,res)=>{
    const user=new User(req.body)
    user.save().then(()=>{
    res.status(201).send(user)
    }).catch((error)=>{
     res.status(400).send(error)
    })
 })



//logging in a user
router.post('/users/login',async (req,res)=>{
    try{
     const user= await User.findByCredentials(req.body.email,req.body.password)
     const token= await user.generateAuthToken()
     res.send({user,token})
    }catch(e){
      res.status(400).send()
    }
})


 //reading a resource
router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

//finding a resource by id
router.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})


//updating a resource and deleting it
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    //The Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.

    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    //every will return only if your fun returns true everytime otherwise it will return false

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const user= await User.findById(req.params.id)

        updates.forEach((update)=>user[update]=req.body[update])

        await user.save()
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports=router