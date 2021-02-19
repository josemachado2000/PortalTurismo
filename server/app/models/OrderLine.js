var db = require("./db.js");

// constructor
const OrderLine = function (orderLine) {
  this.idLinhaEncomenda = orderLine.idLinhaEncomenda;
  this.quantidade = orderLine.quantidade;
  this.totalLinha = orderLine.totalLinha;
  this.idEncomenda = orderLine.idEncomenda;
  this.idProduto = orderLine.idProduto;
};

OrderLine.createOrderLine = (newOrderLine, result) => {
  console.log(newOrderLine);
  db.query(
    "INSERT INTO linhaencomenda (quantidade, totalLinha, idEncomenda, idProduto) VALUES (?, ?, ?, ?)",
    [
      newOrderLine.quantidade,
      newOrderLine.totalLinha,
      newOrderLine.idEncomenda,
      newOrderLine.idProduto,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created order line: ", {
        id: res.insertId,
        ...newOrderLine,
      });
      result(null, { id: res.insertId, ...newOrderLine });
    }
  );
};

// Order.getOrdersByIdUser = (idUser, result) => {
//   db.query(
//     "SELECT e.* FROM encomenda e, cliente c WHERE c.idUser = ? AND c.idCliente = e.idCliente",
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

module.exports = OrderLine;
