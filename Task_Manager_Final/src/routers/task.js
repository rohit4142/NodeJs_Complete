const express= require('express')
const Task=require('../models/task')
const router= new express.Router()
const auth=require('../middleware/auth')

router.post('/tasks',auth, (req,res)=>{
    //const task=new Task(req.body)
    const task= new Task({
        ...req.body,
        author: req.user._id
    })

    task.save().then(()=>{
        res.status(201).send(task)
        }).catch((error)=>{
         res.status(400).send(error)
        })
})


//now we are adding filter to this route because it may possible it may contain 1000 of tasks and user want to see only completed or uncompleted task, so accordingly we need to fix the route.
//get/tasks?completed=true

//we are adding pagination properties to get a limited result at a given time
//get/tasks/limit=10&skip=0

//for sorting: get/tasks?sortBy=createdAt: desc
router.get('/tasks', auth,async (req, res) => {
    try{
        //const tasks=await Task.find({author: req.user._id})

        const match={}

        if(req.query.completed)
         {
            match.completed=req.query.completed==='true'
         }
        //for sorting
        const sort={}
        if(req.query.sortBy)
        {
            parts=req.query.sortBy.split(':')
            sort[parts[0]]=parts[1]==='desc'?-1:1
        }

        await req.user.populate({
            path:'tasks',
            match,
            //for limiting and skip
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req,res)=>{
    const _id=req.params.id
    try{
         const task = await Task.findOne({_id, author: req.user._id})
         if(!task)
         {
            return res.status(404).send()
         }
         res.send(task)
    }catch(e)
    {
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({_id: req.params.id, author:req.user._id})

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, author: req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router