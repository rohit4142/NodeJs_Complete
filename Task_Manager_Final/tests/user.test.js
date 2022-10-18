const request=require('supertest')
const app= require('../src/app')

test('shoul signup a new user', async()=>{
    await request(app).post('/users').send({
        name:'Rohit',
        email:'rohit@gmail.com',
        password:'sd'
    }).expect(201)
})