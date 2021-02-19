const Service = require("../models/Service.js");

// Create and Save a new Service
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Service
  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    stock: req.body.stock,
    preco: req.body.preco,
  });

  // Save Service in the database
  Produto.create(produto, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

exports.createByIdShop = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Service
  const service = new Service({
    nome: req.body.nome,
    descricao: req.body.descricao,
    stock: req.body.stock,
    preco: req.body.preco,
  });

  console.log("ID:" + req.params.idShop);
  // Save Service in the database
  Service.createByIdShop(req.params.idShop, service, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service.",
      });
    else res.send(data);
  });
};

// Retrieve all Services from the database.
exports.findAll = (req, res) => {
  Service.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services.",
      });
    else res.send(data);
  });
};

// Find a single Service with a serviceId
exports.findOne = (req, res) => {
  Service.findById(req.params.serviceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service with id ${req.params.serviceId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Service with id " + req.params.serviceId,
        });
      }
    } else res.send(data);
  });
};

// Update a Service identified by the serviceId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.params.idService);
  console.log(req.body);
  Service.updateById(req.params.idService, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service with id ${req.params.idService}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Service with id " + req.params.idService,
        });
      }
    } else res.send(data);
  });
};

// Delete a Service with the specified serviceId in the request
exports.delete = (req, res) => {
  Produto.remove(req.params.produtoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with id ${req.params.produtoId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Produto with id " + req.params.produtoId,
        });
      }
    } else res.send({ message: `Produto was deleted successfully!` });
  });
};

// Delete all Services from the database.
exports.deleteAll = (req, res) => {
  Produto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all produtos.",
      });
    else res.send({ message: `All Produtos were deleted successfully!` });
  });
};
