import validator from "validator";
import { HttpRequest, HttpResponse } from "../controllers/global/protocols";
import { InterpectorRequest } from "../globals/interceptors";
import { UserRepository } from "../repositories/user/user.repository";
import { CreateUserDto } from "../dto/user/create-user.dto";
import { User } from "../entities/User";

export class UserUseCase implements InterpectorRequest {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(data: HttpRequest<CreateUserDto>): Promise<HttpResponse<User>> {
    try {
      const { body } = data;

      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!body?.[field as keyof CreateUserDto]?.length) {
          return { statusCode: 400, body: `Field ${field} is required` };
        }
      }

      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid)
        return { statusCode: 400, body: "E-mail is not valid" };

      const user = await this.userRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
