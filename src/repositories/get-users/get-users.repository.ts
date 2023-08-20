import { User } from "../../entities/User";

export interface GetUsersReposiroty {
  getUsers(): Promise<User[]>;
}
