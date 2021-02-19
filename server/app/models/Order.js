var db = require("./db.js");

// constructor
const Order = function (order) {
  this.idEncomenda = order.idEncomenda;
  this.dataEncomenda = order.dataEncomenda;
  this.dataEntrega = order.dataEntrega;
  this.valorTotal = order.valorTotal;
  // this.idCliente= order.idCliente;
};

Order.createOrder = (idUser, newOrder, result) => {
  console.log(idUser);
  console.log(newOrder);
  db.query(
    "INSERT INTO encomenda (dataEncomenda, dataEntrega, valorTotal, idCliente) VALUES (?, ?, ?, (SELECT c.idCliente FROM cliente c WHERE c.idUser = ?))",
    [newOrder.dataEncomenda, newOrder.dataEntrega, newOrder.valorTotal, idUser],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created order: ", { id: res.insertId, ...newOrder });
      result(null, { id: res.insertId, ...newOrder });
    }
  );
};

Order.getOrdersByIdUser = (idUser, result) => {
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

module.exports = Order;
