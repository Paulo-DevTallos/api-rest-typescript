import { config } from "dotenv";
import express from "express";

config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 3036;

app.listen(port, () =>
  console.log(`server running on port http://localhost:${port}`),
);
