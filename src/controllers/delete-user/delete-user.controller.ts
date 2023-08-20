import { User } from "../../models/User";
import { DeleteUserRepository } from "../../repositories/delete-user/delete-user.repository";
import { HttpRequest, HttpResponse } from "../global/protocols";
import { DeleteUserProps } from "./protocols";

export class DeleteUserController implements DeleteUserProps {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const { id } = httpRequest.params;

      if (!id) return { statusCode: 400, body: "Missing user id" };

      const user = await this.deleteUserRepository.deleteUser(id);

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
