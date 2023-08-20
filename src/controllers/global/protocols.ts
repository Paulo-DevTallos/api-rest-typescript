/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface HttpResponse<T> {
  statusCode: number;
  body?: T | string;
}

export interface InterceptorController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpRequest<unknown>>;
}
