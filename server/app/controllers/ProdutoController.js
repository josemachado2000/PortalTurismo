const Produto = require("../models/Produto.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Produto
  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    stock: req.body.stock,
    preco: req.body.preco,
  });

  // Save Produto in the database
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

  // Create a Produto
  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    stock: req.body.stock,
    preco: req.body.preco,
  });

  console.log("ID:" + req.params.idShop);
  // Save Produto in the database
  Produto.createByIdShop(req.params.idShop, produto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    else res.send(data);
  });
};

// Retrieve all Produtos from the database.
exports.findAll = (req, res) => {
  Produto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

// Find a single Produto with a idProduct
exports.findOne = (req, res) => {
  Produto.findById(req.params.idProduct, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with id ${req.params.idProduct}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Produto with id " + req.params.idProduct,
        });
      }
    } else res.send(data);
  });
};

// Update a Produto identified by the produtoId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log("BoDY:", req.body);
  console.log("id:", req.params.idProduct);
  Produto.updateById(req.params.idProduct, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with id ${req.params.idProduct}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Produto with id " + req.params.idProduct,
        });
      }
    } else res.send(data);
  });
};

// Delete a Produto with the specified idProduct in the request
exports.delete = (req, res) => {
  Produto.remove(req.params.idProduct, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with id ${req.params.idProduct}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Produto with id " + req.params.idProduct,
        });
      }
    } else res.send({ message: `Produto was deleted successfully!` });
  });
};

// Delete all Produtos from the database.
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
