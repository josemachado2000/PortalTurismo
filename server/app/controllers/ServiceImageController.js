const ServiceImage = require("../models/ServiceImage.js");

// Create and Save a new Service Image
exports.createServiceImage = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Service
  const serviceImage = new ServiceImage({
    imagem: req.body.file,
    idServico: req.body.lastIdService,
  });

  // Save Service in the database
  ServiceImage.createServiceImage(serviceImage, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Service Image.",
      });
    else res.send(data);
  });
};

// Update a Service Image identified by the idService in the request
exports.updateServiceImageById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  ServiceImage.updateServiceImageById(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Service with id ${req.body.idService}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Service with id " + req.body.idService,
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
