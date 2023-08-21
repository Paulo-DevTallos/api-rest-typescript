import validator from "validator";
import { UserRepository } from "../repositories/user/user.repository";
import { CreateUserDto } from "../dto/user/create-user.dto";
import { User } from "../entities/User";
import { HttpExceptions } from "../types/http.exceptions";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const { ...body } = data;
      console.log(body);

      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!body?.[field as keyof CreateUserDto]?.length) {
          throw new HttpExceptions(400, `Field ${field} is required`);
        }
      }

      // verificar se usuario ja existe, criar repository de verificação
      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid) throw new HttpExceptions(400, "E-mail is not valid");

      const user = await this.userRepository.createUser(body!);
      return user;
    } catch (error) {
      throw new HttpExceptions(500, "Something went wrong");
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.getUsers();

      return users;
    } catch (error) {
      throw new HttpExceptions(500, "Something went wrong");
    }
  }
}
