module.exports = (app) => {
  const productImage = require("../controllers/ProductImageController.js");

  // Create Product Image
  app.post("/product/image", productImage.createProductImage);

  // Update Product Image
  app.put("/product/image", productImage.updateProductImageById);
};
