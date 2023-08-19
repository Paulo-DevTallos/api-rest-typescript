import { User } from "../../../models/User";
import { GetUsersReposiroty } from "./get-users.repository";

export class GetUsersReposirotyMongo implements GetUsersReposiroty {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Paulo",
        lastName: "Sergio",
        email: "paulo@email.com.br",
        password: "123456",
      },
    ];
  }
}
