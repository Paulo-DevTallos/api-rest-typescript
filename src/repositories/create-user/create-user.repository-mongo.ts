import { MongoClient } from "../../database";
import { User } from "../../models/User";
import {
  CreateUserParams,
  CreateUserReposiroty,
} from "./create-user.repository";

export class CreateUserReposirotyMongo implements CreateUserReposiroty {
  async createUser(param: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(param);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("user")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("User not created!");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
