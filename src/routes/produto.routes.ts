import { Router } from 'express';
import { executeQuery } from '../config/database';
import addZeroes from '../utils';


const produtosRouter = Router();

produtosRouter.get('/:codigo', (request, response) => {
    const { codigo } = request.params;

    const sql = 'SELECT CODIGO,PRODUTO,UNIDADE,PRECOVENDA FROM C000025 WHERE CODIGO = ?'

    executeQuery(sql, [addZeroes(codigo, 6)], (err, data) => {
        if (err)
            return response.status(400).json({ error: err.toString() });

        return response.status(200).json(data)
    })


})

export { produtosRouter }