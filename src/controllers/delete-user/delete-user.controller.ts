import { User } from "../../entities/User";
import { DeleteUserRepository } from "../../repositories/delete-user/delete-user.repository";
import {
  HttpRequest,
  HttpResponse,
  InterceptorController,
} from "../global/protocols";

export class DeleteUserController implements InterceptorController {
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
