import { User } from "../../models/User";
import {
  UpdateUserParams,
  UpdateUserRepository,
} from "../../repositories/update-user/update-user.repository";
import { HttpRequest, HttpResponse } from "../global/protocols";
import { UpdateUserProps } from "./protocols";

export class UpdateUserController implements UpdateUserProps {
  constructor(private readonly updateUserRepository: UpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const { id } = httpRequest.params;
      const { body } = httpRequest;

      if (!id) return { statusCode: 400, body: "Missing using id" };

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams),
      );

      if (someFieldIsNotAllowedToUpdate) {
        return { statusCode: 400, body: "Some field received is not allowed" };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
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
