import * as mongo from 'mongodb';
import {MongoClient} from "mongodb";

class MongoPersistence {
    client: MongoClient;

    constructor() {
        this.client = new mongo.MongoClient("");
        const db = this.client.db();
    }

    async init () {
        await this.client.connect();
    }
}

/**
 * Creates a MongoDB batch persister. This is used by the
 * `data` api routes.
 * @param {string} uri MongoDB connection URI
 */
// export const createMongoPersister = async (uri) => {
//     console.debug('Using MongoDB Persister');
//
//
//
//     /**
//      * @type {import('../persister-factories.js').Persister}
//      */
//     const persister = {
//         createCheckpoint: async (user_id, client_id) => {
//             const doc = await db.collection('checkpoints').findOneAndUpdate(
//                 {
//                     user_id,
//                     client_id
//                 },
//                 {
//                     $inc: {
//                         checkpoint: 1n
//                     }
//                 },
//                 { upsert: true, returnDocument: 'after' }
//             );
//             return doc.checkpoint;
//         },
//         updateBatch: async (batch) => {
//             for (const op of batch) {
//                 const tableSchema = schema[op.table];
//                 if (tableSchema == null) {
//                     console.warn(`Ignoring update to unknown table ${op.table}`);
//                     continue;
//                 }
//                 const collection = db.collection(op.table);
//                 if (op.op == 'PUT') {
//                     const data = op.data;
//                     const id = op.id ?? data.id;
//                     const doc = { _id: id, ...data };
//                     delete doc.id;
//
//                     const converted = applySchema(tableSchema, doc);
//                     await collection.insertOne(converted);
//                 } else if (op.op == 'PATCH') {
//                     const data = op.data;
//                     const id = op.id ?? data.id;
//                     const doc = { ...data };
//                     delete doc.id;
//
//                     const converted = applySchema(tableSchema, doc);
//                     await collection.updateOne({ _id: id }, { $set: converted });
//                 } else if (op.op == 'DELETE') {
//                     const id = op.id ?? op.data?.id;
//                     if (id != null) {
//                         await collection.deleteOne({ _id: id });
//                     }
//                 }
//             }
//         }
//     };
//
//     return persister;
// };
