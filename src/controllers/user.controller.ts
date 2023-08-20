import { Request, Response } from "express";
import { UserUseCase } from "../useCases/user-useCase";
import { CreateUserDto } from "../dto/user/create-user.dto";

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async createUser(req: Request, res: Response) {
    try {
      const user: CreateUserDto = req.body;
      console.log(user);

      await this.userUseCase.handle(user);

      return res
        .status(201)
        .json({ user, message: "User created with success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}