import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserRepositoryMongo } from "../repositories/user/user.repository.mongo";
import { UserUseCase } from "../useCases/user-useCase";

export class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    const userRepository = new UserRepositoryMongo();
    const userUseCase = new UserUseCase(userRepository);
    this.userController = new UserController(userUseCase);
    this.userRouter();
  }

  userRouter() {
    this.router.post(
      "/user/create",
      this.userController.createUser.bind(this.userController),
    );
    this.router.get(
      "/users",
      this.userController.getUsers.bind(this.userController),
    );
  }
}
