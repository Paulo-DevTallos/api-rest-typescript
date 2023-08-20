import { User } from "../../entities/User";

export interface DeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
