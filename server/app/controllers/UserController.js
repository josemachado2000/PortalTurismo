const User = require("../models/User.js");

// User login
exports.login = (req, res) => {
  User.getUserLogin(req.body.username, req.body.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Error 404: User not found!`,
        });
      } else {
        res.status(500).send({
          message: `Error 500: User not found!`,
        });
      }
    } else {
      res.send({
        data: data,
        token: "token",
      });
    }
  });
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const user = new User({
    nome: req.body.name,
    morada: req.body.address,
    email: req.body.email,
    contacto: req.body.contact,
    username: req.body.username,
    password: req.body.password,
    dataNascimento: "",
    nacionalidade: "",
    biografia: "",
  });

  console.log(user);
  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAllSuppliers = (req, res) => {
  User.getAllSuppliers((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving suppliers.",
      });
    else res.send(data);
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userrId,
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateById(req.params.userId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Update estado with supplierId
exports.updateEstadoSupplier = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateEstadoSupplierById(
    req.params.supplierId,
    req.params.estado,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Supplier with id ${req.params.supplierId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Supplier with id " + req.params.supplierId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
