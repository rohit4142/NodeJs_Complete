const jwt=require('jsonwebtoken')
const User=require('../models/user')

const auth=async(req,res,next)=>
{
try{
const token= req.header('Authorization').replace('Bearer ','')

const decoded= jwt.verify(token,"mynameisrohit")

const user=await User.findOne({_id: decoded._id, 'tokens.token': token})

//if user is not found
if(!user)
{
    throw new Error()
}
//now all routes will have access to this user
req.token=token
req.user=user
next()

}catch(e){
  res.status(401).send({error:'Please autheticate.'})
}
}

module.exports=auth
//to use middleware in individual router ,put it inside the router before the callback function(route handler)

