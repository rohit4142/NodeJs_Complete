//CRUD create read update delete
// The MongoDB Node.js Driver allows you to easily 
// interact with MongoDB databases from within Node.js applications.

//npm i mongodb


const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
// we’ll use MongoClient to connect to a MongoDB database. We can use an instance of MongoClient to connect to a cluster, access the database 
// in that cluster, and close the connection to that cluster.

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    //useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser
    if (error) {
        return console.log('Unable to connect to database!')
    }
   console.log("connected successfully")

    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Andrew',
    //     age: 27
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

        db.collection('tasks').insertMany([
        {
            description: 'Clean the house',
            completed: true
        },{
            description: 'Renew inspection',
            completed: false
        },{
            description: 'Pot plants',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!')
        }

        console.log(result.ops)
    })
})

   