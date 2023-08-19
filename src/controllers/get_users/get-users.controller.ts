import { GetUsersProps } from "./protocols";
import { GetUsersReposiroty } from "../../repositories/get-users/get-users.repository";

export class GetUsersController implements GetUsersProps {
  constructor(private readonly getUserRepository: GetUsersReposiroty) {}

  async handle() {
    try {
      // validar a requisição
      // direcionar chamada para o repository
      const users = await this.getUserRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
