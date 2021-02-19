const Order = require("../models/Order.js");

// Create and Save a new Order
exports.createOrder = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Order
  const order = new Order({
    dataEncomenda: req.body.dataEncomenda,
    dataEntrega: req.body.dataEntrega,
    valorTotal: req.body.valorTotal,
    idCliente: req.body.idUser,
  });

  console.log(req.body);
  // Save Order in the database
  Order.createOrder(req.body.idUser, order, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    else res.send(data);
  });
};

// Retrieve all Orders from the User.
exports.getOrdersByIdUser = (req, res) => {
  Order.getOrdersByIdUser(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    else res.send(data);
  });
};
