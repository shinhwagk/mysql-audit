import * as http from 'http';
import { MongoClient, Db } from 'mongodb'

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

MongoClient.connect(url, (err, client) => {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});


const insertDocuments = function (db: Db, callback) {
    const collection = db.collection('documents');
    collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], (err, result) => {
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}