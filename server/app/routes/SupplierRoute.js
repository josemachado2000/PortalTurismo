module.exports = (app) => {
  const suppliers = require("../controllers/SupplierController.js");

  // Create a new Supplier
  app.post("/suppliers", suppliers.createSupplier);

  // Get Supplier shops
  app.get("/suppliers/shops/:idUser", suppliers.getShops);
  app.get("/suppliers/lojas/:idUser", suppliers.getLojas);

  // Get Supplier products
  app.get("/suppliers/products/:idUser", suppliers.getProducts);

  // Get Supplier services
  app.get("/suppliers/services/:idUser", suppliers.getServices);

  // Get Supplier orders
  app.get("/suppliers/orders/:idUser", suppliers.getOrders);

  // Get Supplier products by idUser
  app.get("/suppliers/produtos/:idUser", suppliers.getProductsByidUser);

  // Get Supplier services by idUser
  app.get("/suppliers/servicos/:idUser", suppliers.getServicesByidUser);
};
