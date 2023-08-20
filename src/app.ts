import { config } from "dotenv";
import express, { Application } from "express";
import { MongoClient } from "./database";
import { UserRouter } from "./routers";

export class App {
  public app: Application;
  private userRouter = new UserRouter();

  constructor() {
    this.app = express();
    this.initRouter();
    config();
    MongoClient.connect();
  }

  initRouter() {
    this.app.use(this.userRouter.router);
  }

  listen() {
    const port = process.env.PORT || 3036;

    this.app.listen(port, () =>
      console.log(`server running on port http://localhost:${port}`),
    );
  }
}

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use();

// app.get("/users", async (req, res) => {
//   const getUserRepositoryMongo = new GetUsersReposirotyMongo();
//   const getUsersController = new GetUsersController(getUserRepositoryMongo);

//   const { statusCode, body } = await getUsersController.handle();
//   res.status(statusCode).send(body);
// });

// // app.post("/users", async (req, res) => {
// //   const createUserRepositoryMongo = new CreateUserReposirotyMongo();
// //   const createUserController = new CreateUserController(
// //     createUserRepositoryMongo,
// //   );

// //   const { statusCode, body } = await createUserController.handle({
// //     body: req.body,
// //   });
// //   res.status(statusCode).send(body);
// // });

// app.patch("/users/:id", async (req, res) => {
//   const updateUserRepositoryMongo = new UpdateUserRepositoryMongo();
//   const updateUserController = new UpdateUserController(
//     updateUserRepositoryMongo,
//   );

//   const { statusCode, body } = await updateUserController.handle({
//     body: req.body,
//     params: req.params,
//   });

//   res.status(statusCode).send(body);
// });

// app.delete("/users/:id", async (req, res) => {
//   const deleteUserRepositoryMongo = new DeleteUserReposirotyMongo();
//   const deleteUserController = new DeleteUserController(
//     deleteUserRepositoryMongo,
//   );

//   const { statusCode, body } = await deleteUserController.handle({
//     params: req.params,
//   });

//   res.status(statusCode).send(body);
// });
