import { MongoClient } from "../../database";
import { User } from "../../models/User";
import { MongoUser } from "../mongo-protocols";
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
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("User not created!");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
