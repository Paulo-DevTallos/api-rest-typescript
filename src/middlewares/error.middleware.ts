/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { HttpExceptions } from "../types/http.exceptions";

export const errorMiddleware = (
  err: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode: number = err.status ?? 500;
  const message: string = err.message ?? "Internal Server error";

  res.status(statusCode).json({
    statusCode,
    message,
  });
};
