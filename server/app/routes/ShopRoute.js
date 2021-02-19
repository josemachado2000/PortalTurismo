module.exports = (app) => {
  const shops = require("../controllers/ShopController.js");

  // Create Shop
  app.post("/suppliers/shop", shops.createShop);
  // Get Shop
  app.get("/suppliers/shop/:idShop", shops.getShopById);
  // Update Shop
  app.put("/suppliers/shop/:idShop", shops.updateShopById);

  // Get Shop products
  app.get("/suppliers/shops/products/:idShop", shops.getShopProductsById);
  // Get Shop services
  app.get("/suppliers/shops/services/:idShop", shops.getShopServicesById);
};
