const mongodb=require('mongodb')
const { MongoClient, ObjectID } = require('mongodb')


const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error)
    {
        return console.log('unable to connect to database')
    }
   
    const db=client.db(databaseName)
    //fetching data from database
    /*
    first we need to specify collection and then the fetching method.
    findOne taks two arguments 1. A object containing search criteria and 2. a callback fun
    */
    db.collection('users').findOne({ name:'Andrew'},(error,user)=>{
        if(error)
        {
            console.log('Unable to fetch');
        }
        else
        {
            console.log(user);
        }
    })
  //fetching elemet using id proprty
  db.collection('users').findOne({ _id: new ObjectID("62451b5e7c5ea00b182d2b23") }, (error, user) => {
    if (error) {
        return console.log('Unable to fetch')
    }

    console.log(user)
})

//to find multiple documents we need to use find method and it has no callbacks instead it returns a cursor.
//   find(query, options)=>{Cursor}
// Creates a cursor for a query that can be used to iterate over results from MongoDB
//and upon curson we can apply various methods. here we are applying toArray method.

// toArray(callback){Promise}
// Returns an array of documents. The caller is responsible for making sure that there
// is enough memory to store the results. Note that the array only contains partial
// results when this cursor had been previously accessed. In that case,
// cursor.rewind() can be used to reset the cursor.
 
db.collection('users').find({ age: 27 }).toArray((error, users) => {
    console.log(users)
})
//you can also use cursor.count to know the number of documents returned by find.

db.collection('tasks').findOne({ _id: new ObjectID("5c0fec243ef6bdfbe1d62e2f") }, (error, task) => {
    console.log(task)
})

db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    console.log(tasks)
})
})
   