import Router from "express";
import {
  atualizarCarros,
  cadastrarCarros,
  detalharCarros,
  excluirCarros,
  listarCarros,
} from "../controllers/carros";

const routers = Router();

routers.get("/carros", listarCarros);
routers.get("/carros/:id", detalharCarros);
routers.post("/carros", cadastrarCarros);
routers.put("/carros/:id", atualizarCarros);
routers.delete("/carros/:id", excluirCarros);
export default routers;
