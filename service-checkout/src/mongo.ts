import { MongoClient, Db } from 'mongodb';
import { mongoUrl } from './services'


interface ICRSQL {
    text: string,
    digest?: string,
    stages?: {
        inspections: { name: string, timestamp: number, state: boolean, msg?: string }[],
        execute?: { timestamp: number, msg?: string, state: boolean }
    }
}

interface ICRSQLGROUP {
    timestamp: number
    sqls: string[] // ICRSQL _id
}

// interface ICRINPUTGITLAB {

//     sqlgroup: string
// }

const mClient = MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
// setInterval(async () => (await mClient).isConnected)



const createSQLGroup = function (db: Db, callback: (a: string) => void) {
    // const collection = db.collection('sqlgroup');
    // collection.in([{ a: 1 }, { a: 2 }, { a: 3 }], (err, result) => {
    //     console.log("Inserted 3 documents into the collection");
    //     callback("result");
    // });
}

export const insertSQLS = async function (sqls: string[]): Promise<string> {
    const db = (await mClient).db();
    const rs = await db.collection("crsqls").insertMany(sqls.map(sql => { return { test: sql } }))
    const rs1 = await db.collection('crsqlgroup').insertOne({ sqls: Object.values(rs.insertedIds) })
    return rs1.insertedId as string
}

export const recordSQLDigest = async function (id: string, digest: string): Promise<void> {
    const db = (await mClient).db();
    await db.collection("crsqls").findOneAndUpdate({ _id: id }, { $set: { digest } })
    return
}

// const updateSQLState = function (db: Db, callback: (a: string) => void) {
//     const collection = db.collection('crsqls');
//     collection.updateOne([{}])
//     collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], (err, result) => {
//         console.log("Inserted 3 documents into the collection");
//         callback("result");
//     });
// }


