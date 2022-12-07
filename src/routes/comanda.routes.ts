import { executeQuery } from "../config/database";
import { Router } from "express";

const comandaRouter = Router();

comandaRouter.get("/", (request, response) => {
    executeQuery("select * from r000001 order by codigo", [], (err, data) => {
        if (err) {
            return response.status(400).json({ error: err.toString() });
        }

        return response.status(200).json(data);
    });
});

comandaRouter.get("/:id", (request, response) => {
    const { id } = request.params;
    executeQuery(
        "select a.*, b.produto from r000002 a inner join c000025 b on b.codigo = a.cod_produto",
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
    const { cod_produto, complemento, qtde, unitario, total } = request.body;
    const { id } = request.params;

    const sql = 'INSERT INTO R000002(COD_MESA,COD_PRODUTO,COMPLEMENTO,QTDE,UNITARIO,TOTAL,CANCELADO)VALUES(?,?,?,?,?,?,?) RETURNING CODIGO';

    executeQuery(sql, [id, cod_produto, complemento, qtde, unitario, total, 0], (err, data) => {
        if (err) {
            return response.status(400).json({ error: err.toString() });
        }

        return response.status(201).json(data);
    })


});

comandaRouter.put("/:id/cancelar", (request, response) => {
    const { id } = request.params;
    const sql = 'UPDATE R000002 SET CANCELADO = 1 WHERE COD_MESA = ?; DELETE FROM R000001 WHERE CODIGO = ?';

    executeQuery(sql, [id, id], (err, data) => {
        if (err) {
            return response.status(400).json({ error: err.toString() });
        }

        return response.status(201).json(data);
    })
});

comandaRouter.put("/:id/cancelar/:item", (request, response) => {
    const { id, item } = request.params;
    const sql = 'UPDATE R000002 SET CANCELADO = 1 WHERE COD_MESA = ? AND COD_PRODUTO = ?';

    executeQuery(sql, [id, item], (err, data) => {
        if (err) {
            return response.status(400).json({ error: err.toString() });
        }

        return response.status(201).json(data);
    })
});

export { comandaRouter };
