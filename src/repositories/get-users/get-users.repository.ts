import { User } from "../../models/User";

export interface GetUsersReposiroty {
  getUsers(): Promise<User[]>;
}
