import { User } from "../models/User";

export type MongoUser = Omit<User, "id">;
