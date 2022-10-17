const express= require('express')
const { findById } = require('../models/user')
const User=require('../models/user')
const auth=require('../middleware/auth')
const sharp=require('sharp')
const multer = require('multer')

var jwt = require('jsonwebtoken');
const router= new express.Router()

//adding a post method to create a resource//sign up
router.post('/users', async (req,res)=>{
    const user= new User(req.body)
    try{
       await user.save()
       const token =await user.generateAuthToken()
       res.status(201).send({user,token}) //we are sending back all the data to the client which is not a good practice we need to restrict some sensitive info we have to add a .toJSON method inside our model folder
       
    }
    catch(e)
    {
     res.status(400).send(e)
    }
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


//logging out a user
router.post('/users/logout',auth,async (req,res,)=>{
    try{
     req.user.tokens=req.user.tokens.filter((token)=>{
        return token.token!==req.token
     })

     await req.user.save()
    res.send()
    }catch(e){
     res.status(500).send()
    }
})

//looging out from all sessions
router.post('/users/logoutAll',auth, async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch{
         res.status(500).send()
    }
})



 //reading a resource
router.get('/users/me', auth,(req, res) => {
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

    //commented above code beacuse in the real life we dont need everyone's data ,it should show only authenticated user's data and in authentication method we are already getting it show we need to just return that
    res.send(req.user)
})

//finding a resource by id
// router.get('/users/:id', (req, res) => {
//     const _id = req.params.id

//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })
//now there is no need to find any user by id , now one should log in and see his/her own profile using /users/me route


//updating a resource and deleting it
router.patch('/users/me',auth, async (req, res) => {
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
        //const user= await User.findById(req.params.id)

        updates.forEach((update)=>req.user[update]=req.body[update])

        await req.user.save()
    
        // if (!req.user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//modifying the code so that only the logged in user can delete the acoount

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }
        //there is more simpler way than the above code
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//uploading a file
const upload = multer({
    //here we are removind dest property because we want to save image in our user database
   // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports=router
