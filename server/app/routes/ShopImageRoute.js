module.exports = (app) => {
  const imageShop = require("../controllers/ShopImageController.js");

  // Create Shop Image
  app.post("/shop/image", imageShop.createShopImage);
  // Update Shop Image
  app.put("/shop/image", imageShop.updateShopImageById);
};
