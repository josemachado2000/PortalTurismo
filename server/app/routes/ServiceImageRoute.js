module.exports = (app) => {
  const serviceImage = require("../controllers/ServiceImageController.js");

  // Create Service Image
  app.post("/service/image", serviceImage.createServiceImage);

  // Update Service Image
  app.put("/service/image", serviceImage.updateServiceImageById);
};
