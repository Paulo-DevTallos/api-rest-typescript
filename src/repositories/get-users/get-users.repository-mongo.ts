import { MongoClient } from "../../database";
import { User } from "../../models/User";
import { GetUsersReposiroty } from "./get-users.repository";

export class GetUsersReposirotyMongo implements GetUsersReposiroty {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    // converter id com underline para o padrão da model de User
    // ({_id, ...rest}) => remove o _id e retorna todo o resto ...rest
    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
