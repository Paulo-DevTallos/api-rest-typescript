import { ObjectId } from "mongodb";
import { MongoClient } from "../../database";
import { User } from "../../entities/User";
import {
  UpdateUserParams,
  UpdateUserRepository,
} from "./update-user.repository";
import { MongoUser } from "../mongo-protocols";

export class UpdateUserRepositoryMongo implements UpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      },
    );

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) throw new Error("User not updated");

    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
