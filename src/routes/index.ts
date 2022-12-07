import { Router } from "express";

import { comandaRouter } from "./comanda.routes";
import { produtosRouter } from './produto.routes';
import { funcionariosRouter } from './funcionario.routes';

const router = Router();

router.use("/comandas", comandaRouter);
router.use("/produtos", produtosRouter);
router.use('/funcionarios', funcionariosRouter)

export { router };
