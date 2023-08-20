import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  // esse cliente e db podem ser undefined ou Mongo ou Db
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.DB_CONNECTION || "mongodb://localhost:27017";

    const client = new Mongo(url);
    const db = client.db("crud-clean-api");

    this.client = client;
    this.db = db;

    console.log("connection succefull");
  },

  // todo
  async mapId() {},
};
