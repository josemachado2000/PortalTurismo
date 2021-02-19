var db = require("./db.js");

// constructor
const Client = function (cli) {
  this.idFornLoj = cli.idFornLoj;
  this.nomeApp = cli.nomeApp;
  this.estado = cli.estado;
  this.idUser = cli.idUser;
};

Client.createClient = (newClient, username, result) => {
  db.query(
    "INSERT INTO cliente (nomeApp, estado, idUser) VALUE (?, ?, (SELECT idUser FROM user where username = ?))",
    [newClient.nomeApp, newClient.estado, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created client: ", { id: res.insertId, ...newClient });
      result(null, { id: res.insertId, ...newClient });
    }
  );
};

Client.getOrders = (idUser, result) => {
  db.query(
    "SELECT e.* FROM encomenda e, cliente c WHERE c.idUser = ? AND c.idCliente = e.idCliente",
    [idUser],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Orders: ", res);
      result(null, res);
    }
  );
};

Client.getOrdersById = (idOrder, result) => {
  db.query(
    "SELECT le.*, fp.imagem, p.*, e.valorTotal from linhaencomenda le, fotoproduto fp, produto p, encomenda e where e.idEncomenda = ? AND e.idEncomenda = le.idEncomenda AND le.idProduto = p.idProduto AND p.idProduto = fp.idProduto",
    [idOrder],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found orders: ", res);
        result(null, res);
        return;
      }

      // not found Order with the id
      result({ kind: "not_found" }, null);
    }
  );
};

// Client.getOrders = (idUser, result) => {
//   db.query(
//     "SELECT le., p.*, fp.imagem, e.* FROM linhaencomenda le, encomenda e, fotoproduto fp, produto p, cliente c WHERE c.idUser = ? AND c.idCliente = e.idCliente AND e.idEncomenda = le.idEncomenda AND le.idProduto = p.idProduto AND p.idProduto = fp.idProduto",
//     [idUser],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       console.log("Orders: ", res);
//       result(null, res);
//     }
//   );
// };

module.exports = Client;
