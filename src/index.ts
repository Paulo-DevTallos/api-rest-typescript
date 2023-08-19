import { config } from "dotenv";
import express from "express";
import { GetUsersController } from "./controllers/get_users/get-users.controller";
import { GetUsersReposirotyMongo } from "./repositories/get-users/get-users.repository-mongo";
import { MongoClient } from "./database";
import { CreateUserReposirotyMongo } from "./repositories/create-user/create-user.repository-mongo";
import { CreateUserController } from "./controllers/create-user/create-user.controller";
import { UpdateUserRepositoryMongo } from "./repositories/update-user/update-user.repository-mongo";
import { UpdateUserController } from "./controllers/update-user/update-user.controller";

config();
MongoClient.connect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const getUserRepositoryMongo = new GetUsersReposirotyMongo();
  const getUsersController = new GetUsersController(getUserRepositoryMongo);

  const { statusCode, body } = await getUsersController.handle();
  res.status(statusCode).send(body);
});

app.post("/users", async (req, res) => {
  const createUserRepositoryMongo = new CreateUserReposirotyMongo();
  const createUserController = new CreateUserController(
    createUserRepositoryMongo,
  );

  const { statusCode, body } = await createUserController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});

app.patch("/users/:id", async (req, res) => {
  const updateUserRepositoryMongo = new UpdateUserRepositoryMongo();
  const updateUserController = new UpdateUserController(
    updateUserRepositoryMongo,
  );

  const { statusCode, body } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

const port = process.env.PORT || 3036;

app.listen(port, () =>
  console.log(`server running on port http://localhost:${port}`),
);
