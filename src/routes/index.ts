import { Router } from "express";

import { comandaRouter } from "./comanda.routes";

const router = Router();

router.use("/comandas", comandaRouter);

export { router };
