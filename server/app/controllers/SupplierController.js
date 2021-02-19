const Supplier = require("../models/Supplier.js");

// Create and Save a new Supplier
exports.createSupplier = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Supplier
  const supplier = new Supplier({
    nomeApp: req.body.nameApp,
    estado: "Ativo",
  });

  // Save Supplier in the database
  Supplier.createSupplier(supplier, req.body.username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Supplier.",
      });
    else res.send(data);
  });
};

// Retrieve all Shops from this Supplier
exports.getShops = (req, res) => {
  Supplier.getShops(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving shops.",
      });
    else res.send(data);
  });
};

exports.getLojas = (req, res) => {
  Supplier.getLojas(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving shops.",
      });
    else res.send(data);
  });
};

// Retrieve all Products from this Supplier
exports.getProducts = (req, res) => {
  Supplier.getProducts(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

// Retrieve all Services from this Supplier
exports.getServices = (req, res) => {
  Supplier.getServices(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services.",
      });
    else res.send(data);
  });
};

// Retrieve all Orders from this Supplier
exports.getOrders = (req, res) => {
  Supplier.getOrders(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    else res.send(data);
  });
};

// Retrieve all Products from this Supplier
exports.getProductsByidUser = (req, res) => {
  Supplier.getProductsByidUser(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

// Retrieve all Services from this Supplier
exports.getServicesByidUser = (req, res) => {
  Supplier.getServicesByidUser(req.params.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services.",
      });
    else res.send(data);
  });
};
