import { executeQuery } from "config/database";
import { Router } from "express";

const comandaRouter = Router();

comandaRouter.get("/", (request, response) => {
  executeQuery("select * from r000001 order by cod_mesa", [], (err, data) => {
    if (err) {
      return response.status(400).json({ error: err.toString() });
    }

    return response.status(200).json(data);
  });
});

comandaRouter.get("/:id", (request, response) => {
  const { id } = request.params;
  executeQuery(
    "select * from r000001 where cod_mesa = ?",
    [id],
    (err, data) => {
      if (err) {
        response.status(400).json({ error: err.toString() });
      }
      return response.status(200).json(data);
    }
  );
});

comandaRouter.post("/:id", (request, response) => {
  const { items } = request.body;
  const { id } = request.params;

  return response.json({ message: "adicionados" });
});

comandaRouter.put("/:id/cancelar");

comandaRouter.put("/:id/cancelar");

export { comandaRouter };
