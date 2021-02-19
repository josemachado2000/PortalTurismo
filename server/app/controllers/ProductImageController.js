const ProductImage = require("../models/ProductImage.js");

// Create and Save a new Product Image
exports.createProductImage = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Product
  const productImage = new ProductImage({
    imagem: req.body.file,
    idProduto: req.body.lastIdProduct,
  });

  // Save Product in the database
  ProductImage.createProductImage(productImage, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Product Image.",
      });
    else res.send(data);
  });
};

// Update a Product Image identified by the idProduct in the request
exports.updateProductImageById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  ProductImage.updateProductImageById(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.body.idProduct}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Product with id " + req.body.idProduct,
        });
      }
    } else res.send(data);
  });
};
