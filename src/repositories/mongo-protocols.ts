import { User } from "../entities/User";

export type MongoUser = Omit<User, "id">;
