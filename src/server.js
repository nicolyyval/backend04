import express from "express";
import { config } from "dotenv";
import rotas from "./routes/index.routes.js";

config();

const port = process.env.PORT || 2000;

const app = express();
app.use(express.json());

app.use(rotas);

app.listen(port, () =>
  console.log(`💋 Server started on http://localhost:${port}`)
);