module.exports = (app) => {
  const clients = require("../controllers/ClientController.js");

  // Create a new Client
  app.post("/clients", clients.createClient);

  // Get Client orders
  app.get("/clients/orders/:idUser", clients.getOrders);

  // Get Client orders by order id
  app.get("/clients/order/:idOrder", clients.getOrdersById);
};
