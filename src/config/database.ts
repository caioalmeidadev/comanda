import firebird, { Options, QueryCallback, Transaction } from "node-firebird";

const dbOptions: Options = {
  host: process.env.HOSTNAME,
  port: Number(process.env.PORT),
  database: process.env.PATH,
  user: "SYSDBA",
  password: "masterkey",
  lowercase_keys: true, // set to true to lowercase keys
  role: undefined, // default
  pageSize: 4096, // default when creating database
};

function executeQuery(ssql: string, params: any[], callback: QueryCallback) {
  firebird.attach(dbOptions, function (err, db) {
    if (err) {
      return callback(err, []);
    }

    db.query(ssql, params, function (err, result) {
      db.detach();

      if (err) {
        return callback(err, []);
      } else {
        return callback(undefined, result);
      }
    });
  });
}

async function executeQueryTrx(
  transaction: Transaction,
  ssql: string,
  parameters: any[]
) {
  return new Promise(function (resolve, reject) {
    transaction.query(ssql, parameters, function (err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

export { executeQuery, firebird, dbOptions, executeQueryTrx };
