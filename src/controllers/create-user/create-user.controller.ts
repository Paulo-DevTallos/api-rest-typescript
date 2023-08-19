import validator from "validator";
import { User } from "../../models/User";
import {
  CreateUserParams,
  CreateUserReposiroty,
} from "../../repositories/create-user/create-user.repository";
import { HttpRequest, HttpResponse } from "../global/protocols";
import { CreateUserProps } from "./protocols";

export class CreateUserController implements CreateUserProps {
  constructor(private readonly createUserRepository: CreateUserReposiroty) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const { body } = httpRequest;

      // verificar campos obrigatórios
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!body?.[field as keyof CreateUserParams]?.length) {
          return { statusCode: 400, body: `Field ${field} id required` };
        }
      }

      // verificar se o email é valido
      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid) return { statusCode: 400, body: "Email is invalid" };

      const user = await this.createUserRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
