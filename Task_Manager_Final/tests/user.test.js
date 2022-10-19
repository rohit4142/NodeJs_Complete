const request=require('supertest')
const app= require('../src/app')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=require('../src/models/user')
const {userOne,userOneId, setUpDatabase}=require('./fixtures/db')



//performing certain thins before each test
beforeEach(setUpDatabase)

test('shoul signup a new user', async()=>{
    const response= await request(app).post('/users').send({
         name:'Rohit',
         email:'rohit107@gmail.com',
         password:'sdfklsdnfklsdlnflksd'
     }).expect(201)
 
     //asserting that database was changed correctly
     const user= await User.findById(response.body.user._id)
     expect(user).not.toBeNull()
     // Assertions about the response
     expect(response.body).toMatchObject({
         user: {
             name:'Rohit',
             email:'rohit107@gmail.com',
         },
         token: user.tokens[0].token
     })
     //checking password doesn't save as plain pass
     expect(user.password).not.toBe('sdfklsdnfklsdlnflksd')
 
 })

//checking log in assertion
test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

//checking loging of unauthorized user
test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

//test to get profile of a user
 test ('should get profile for user',async()=>{
    await request (app).get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`).send().expect(200)
 })

 //should not get profile of unauthorizes user
 test ('should get profile for user',async()=>{
    await request (app).get('/users/me')
    .send().expect(401)
 })


 //test for deleting a user
 test('Should delete a user account',async()=>{
    await request(app).delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`).send().expect(200)

    const user=await User.findById(userOneId)
    expect(user).toBeNull()
 })

 //don't delete a account for unauthorized user
 test('should not delete account for unauthentic user',async()=>{
    await request(app).delete('/users/me')
    .send()
    .expect(401)
 })

 //should upload an image
 test('should upload an image', async()=>{
    await request(app).post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user= await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
 })

 //should update valid user fields

 test('should update valid user fields',async()=>{
    await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`).send({
        name:'Jaya'
    }).expect(200)
   
    const user=await User.findById(userOneId)
    expect(user.name).toEqual('Jaya')

 })
 test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Philadelphia'
        })
        .expect(400)
})
