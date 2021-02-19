module.exports = (app) => {
  const services = require("../controllers/ServiceController.js");

  // Create a new Service
  app.post("/services", services.create);

  // Create a new Service by idShop
  app.post("/suppliers/shop/createService/:idShop", services.createByIdShop);

  // Retrieve all Services
  app.get("/services", services.findAll);

  // Retrieve a single Service with serviceId
  app.get("/services/:serviceId", services.findOne);

  // Update a Service with idService
  app.put("/services/:idService", services.update);

  // Delete a Service with serviceId
  app.delete("/services/:serviceId", services.delete);

  // Delete all Services
  app.delete("/services", services.deleteAll);
};
