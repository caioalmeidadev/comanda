import { Router } from 'express';
import { executeQuery } from '../config/database';


const funcionariosRouter = Router();

funcionariosRouter.get('/vendedores', (request, response) => {
    const sql = 'SELECT CODIGO,NOME FROM C000008 WHERE F_VENDEDOR = 1 ORDER BY CODIGO';
    executeQuery(sql, [], (err, data) => {
        if (err)
            return response.status(400).json({ error: err.toString() });

        return response.status(200).json({ vendedores: data })
    })
})

export { funcionariosRouter }