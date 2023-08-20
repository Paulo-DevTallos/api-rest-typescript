import { ObjectId } from "mongodb";
import { MongoClient } from "../../database";
import { DeleteUserRepository } from "./delete-user.repository";
import { User } from "../../entities/User";
import { MongoUser } from "../mongo-protocols";

export class DeleteUserReposirotyMongo implements DeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) throw new Error("User not found");

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) throw new Error("User not deleted");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
