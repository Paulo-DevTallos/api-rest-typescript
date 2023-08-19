import { User } from "../../models/User";

export interface DeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
