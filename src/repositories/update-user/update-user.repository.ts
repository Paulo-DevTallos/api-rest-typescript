import { User } from "../../entities/User";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface UpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
