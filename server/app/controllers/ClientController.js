const Client = require("../models/Client.js");

// Create and Save a new Client
exports.createClient = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Client
  const client = new Client({
    nomeApp: req.body.nameApp,
    estado: "Ativo",
  });

  // Save Client in the database
  Client.createClient(client, req.body.username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client.",
      });
    else res.send(data);
  });
};

// Retrieve all Orders from this Client
exports.getOrders = (req, res) => {
  Client.getOrders(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    else res.send(data);
  });
};

// Find a single ORder with a idOrder
exports.getOrdersById = (req, res) => {
  Client.getOrdersById(req.params.idOrder, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.idOrder}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + req.params.idOrder,
        });
      }
    } else res.send(data);
  });
};
