import { User } from "../../models/User";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserReposiroty {
  createUser(param: CreateUserParams): Promise<User>;
}
