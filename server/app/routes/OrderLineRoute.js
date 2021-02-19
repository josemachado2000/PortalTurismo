module.exports = (app) => {
  const orderLine = require("../controllers/OrderLineController.js");

  // Create Order Line
  app.post("/orderLine", orderLine.createOrderLine);

  // // Get Order by idUser
  // app.get("/orders/:idUser", order.getOrdersByIdUser);
};
