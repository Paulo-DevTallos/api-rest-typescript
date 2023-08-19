import { User } from "../../models/User";
import { CreateUserParams } from "../../repositories/create-user/create-user.repository";
import { HttpRequest, HttpResponse } from "../global/protocols";

export interface CreateUserProps {
  handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>>;
}
