const mongodb = require('mongodb')
const mongodbClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

let database;

async function getDatabase(){
    const client = await mongodbClient.connect('mongodb://127.0.0.1:27017')
    database = client.db('temp')

    if(!database){
        console.log("Database not connected");
    }
    return database;
}
module.exports = {
    getDatabase,
    ObjectID
}