const ShopImage = require("../models/ShopImage.js");

// Create and Save a new Shop Image
exports.createShopImage = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Shop
  const imageShop = new ShopImage({
    imagem: req.body.file,
  });
  console.log(req.body.lastIdShop);
  // Save Shop in the database
  ShopImage.createShopImage(req.body.lastIdShop, imageShop, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Shop Image.",
      });
    else res.send(data);
  });
};

// // Retrieve Shop by idShop
// exports.getShopById = (req, res) => {
//   Shop.getShopById(req.params.idShop, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving shop.",
//       });
//     else res.send(data);
//   });
// };

// Update a Shop Image identified by the idShop in the request
exports.updateShopImageById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  ShopImage.updateShopImageById(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Shop with id ${req.body.idShop}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Shop with id " + req.body.idShop,
        });
      }
    } else res.send(data);
  });
};

// // Retrieve all Produtos from this shop
// exports.getShopProductsById = (req, res) => {
//   Shop.getShopProductsById(req.params.idShop, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving products.",
//       });
//     else res.send(data);
//   });
// };

// // Retrieve all Services from this shop
// exports.getShopServicesById = (req, res) => {
//   Shop.getShopServicesById(req.params.idShop, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving services.",
//       });
//     else res.send(data);
//   });
// };
