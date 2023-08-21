import { CreateUserDto } from "../../dto/user/create-user.dto";
import { User } from "../../entities/User";

export interface UserRepository {
  createUser(data: CreateUserDto): Promise<User>;
  getUsers(): Promise<User[]>;
}
