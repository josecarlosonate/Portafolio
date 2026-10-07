import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "portfolio";

let client: MongoClient | null = null;
let connection: Promise<MongoClient> | null = null;

export async function getDb(): Promise<Db> {
    if (!uri) {
        throw new Error("Missing MONGODB_URI");
    }

    if (!client) {
        client = new MongoClient(uri);
        connection = client.connect();
    }

    await connection;
    return client.db(dbName);
}
