// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    //we use updateone to   Update one document.

    //updateOne take three  parameters
//     Name	Type	Description
//   filter	object	 The Filter used to select the document to update

//   update	object	 The update operations to be applied to the document 

// callback	Collection~updateWriteOpCallback	optional The command result callback

//it returns a promise if no callback is passed

 const updatePromise=db.collection('users').updateOne({_id:new ObjectID("6246374b41f20a728c0589cb")},
 {   //$set:sets the value of a field in document
     $set:{  //these is the operation we are going to perform on our document.
         name:'Rohit'
     }
 })
 //for more operations on updarte operatior visit "docs.mongodb.com/manual/reference/operator/update"
 updatePromise.then((result)=>{
     console.log(result)
 }).catch((error)=>{
 console.log(error);
 })

//we can write the same thing as below we just need to use .notation instead storing promise in other variable
    db.collection('users').updateOne({
        _id: new ObjectID("6246374b41f20a728c0589cb")
    }, {
        $inc: {   //increments the value of field by the specified amount.
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
})