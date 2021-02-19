module.exports = (app) => {
  const users = require("../controllers/UserController.js");

  // User login
  app.use("/login", users.login);

  // Create a new User
  app.post("/users", users.create);

  // Retrieve all Users
  app.get("/users", users.findAll);

  // Retrieve all Suppliers
  app.get("/suppliers", users.findAllSuppliers);

  // Retrieve a single User with userId
  app.get("/users/:userId", users.findOne);

  // Update a User with userId
  app.put("/users/:userId", users.update);

  // Update estado with supplierId
  app.put("/suppliers/:supplierId&:estado", users.updateEstadoSupplier);

  // Delete a User with userId
  app.delete("/users/:userId", users.delete);

  // Delete all Users
  app.delete("/users", users.deleteAll);
};
