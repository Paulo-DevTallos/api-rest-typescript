import { User } from "../../models/User";
import { HttpRequest, HttpResponse } from "../global/protocols";

export interface UpdateUserProps {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}
