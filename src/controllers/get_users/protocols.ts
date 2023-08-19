import { User } from "../../models/User";
import { HttpResponse } from "../global/protocols";

/**
 * Arquivo que contém as interfaces que serão
 * implementadas pelo get-users.ts
 *
 */
export interface GetUsersProps {
  handle(): Promise<HttpResponse<User[]>>;
}
