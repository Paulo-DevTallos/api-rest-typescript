import { HttpRequest, HttpResponse } from "../controllers/global/protocols";

export interface InterpectorRequest {
  handle(data: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
