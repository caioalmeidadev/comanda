import { executeQuery } from "config/database";

class Comanda {
  private cod_mesa: string;
  private data_abertura: string;
  private cod_funcionario: string;

  listar() {
    return executeQuery("select * from r000001", [], function (err, data) {
      if (err) {
        throw new Error(err.toString());
      }

      return data;
    });
  }
  mostrar();
  cancelarComanda();
  cancelarItem();
  fecharComanda();
}

export { Comanda };
