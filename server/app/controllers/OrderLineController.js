const OrderLine = require("../models/OrderLine.js");

// Create and Save a new Order Line
exports.createOrderLine = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Order Line
  const orderLine = new OrderLine({
    quantidade: req.body.quantidade,
    totalLinha: req.body.totalLinha,
    idEncomenda: req.body.lastIdEncomenda,
    idProduto: req.body.idProduto,
  });

  // Save Order Line in the database
  OrderLine.createOrderLine(orderLine, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order Line.",
      });
    else res.send(data);
  });
};

// // Retrieve all Orders from the User.
// exports.getOrdersByIdUser = (req, res) => {
//   Order.getOrdersByIdUser(req.params.idUser, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving orders.",
//       });
//     else res.send(data);
//   });
// };
