import {Db, MongoClient, ObjectId} from "mongodb";

export type UpdateEvent = {
    table: string;
    id: string;
    data: any;
}

export default class MongoPersistence {
    private client: MongoClient;
    private database: Db;

    constructor(config: { name: string, uri: string }) {
        this.client = new MongoClient(`${config.uri}?directConnection=true`);
        this.database = this.client.db(config.name);
    }

    async init () {
        await this.client.connect();
    }

    async update (updateEvent: UpdateEvent): Promise<void> {
        try {
            console.log(updateEvent);
            const filter = { _id: new ObjectId(updateEvent.id) };
            const collection = this.database.collection(updateEvent.table);
            const updateDoc = {
                $set: { ...updateEvent.data }
            };
            const result = await collection.updateOne(filter, updateDoc);
            console.log(result);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await this.client.close();
        }
    }

    async upsert (updateEvent: UpdateEvent): Promise<void> {
        try {
            console.log(updateEvent);
            const filter = { _id: new ObjectId(updateEvent.id) };
            const collection = this.database.collection(updateEvent.table);
            const updateDoc = {
                $set: { ...updateEvent.data }
            };
            const options = {
                upsert: true,
            };
            const result = await collection.updateOne(filter, updateDoc, options);
            console.log(result);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await this.client.close();
        }
    }

    async delete (updateEvent: UpdateEvent): Promise<void> {
        try {
            console.log(updateEvent);
            const filter = { _id: new ObjectId(updateEvent.id) };
            const collection = this.database.collection(updateEvent.table);
            const result = await collection.deleteOne(filter);
            console.log(result);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await this.client.close();
        }
    }
}
