import { config } from "dotenv";
import express from "express";
import { GetUsersController } from "./controllers/get_users/get-users.controller";
import { GetUsersReposirotyMongo } from "./repositories/get-users/get-users.repository-mongo";
import { MongoClient } from "./database";

config();
MongoClient.connect();
const app = express();

app.get("/users", async (req, res) => {
  const getUserRepositoryMongo = new GetUsersReposirotyMongo();
  const getUsersController = new GetUsersController(getUserRepositoryMongo);

  const { statusCode, body } = await getUsersController.handle();
  res.send(body).status(statusCode);
});

const port = process.env.PORT || 3036;

app.listen(port, () =>
  console.log(`server running on port http://localhost:${port}`),
);
