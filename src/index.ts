import "dotenv/config";
import express from "express";
import routers from "./router/router";

const app = express();

app.use(express.json());

app.use(routers);

const port = Number(process.env.SERVER_PORT) || 3001;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
