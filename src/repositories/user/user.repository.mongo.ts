import { MongoClient } from "../../database";
import { CreateUserDto } from "../../dto/user/create-user.dto";
import { User } from "../../entities/User";
import { MongoUser } from "../mongo-protocols";
import { UserRepository } from "./user.repository";

export class UserRepositoryMongo implements UserRepository {
  async createUser(data: CreateUserDto): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(data);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("User not created");

    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }

  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
