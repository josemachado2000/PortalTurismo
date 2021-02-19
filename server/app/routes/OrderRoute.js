module.exports = (app) => {
  const order = require("../controllers/OrderController.js");

  // Create Order
  app.post("/client/order", order.createOrder);

  // Get Order by idUser
  app.get("/orders/:idUser", order.getOrdersByIdUser);
};
