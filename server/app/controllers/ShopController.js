const Shop = require("../models/Shop.js");

// Create and Save a new Shop
exports.createShop = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Shop
  const shop = new Shop({
    categoria: req.body.categoria,
    descricao: req.body.descricao,
  });

  // Save Shop in the database
  Shop.createShop(shop, req.body.idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Shop.",
      });
    else res.send(data);
  });
};

// Retrieve Shop by idShop
exports.getShopById = (req, res) => {
  Shop.getShopById(req.params.idShop, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving shop.",
      });
    else res.send(data);
  });
};

// Update a Shop identified by the idShop in the request
exports.updateShopById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Shop.updateShopById(req.params.idShop, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Shop with id ${req.params.idShop}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Shop with id " + req.params.idShop,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all Produtos from this shop
exports.getShopProductsById = (req, res) => {
  Shop.getShopProductsById(req.params.idShop, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

// Retrieve all Services from this shop
exports.getShopServicesById = (req, res) => {
  Shop.getShopServicesById(req.params.idShop, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services.",
      });
    else res.send(data);
  });
};
