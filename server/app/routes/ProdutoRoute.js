module.exports = (app) => {
  const produtos = require("../controllers/ProdutoController.js");

  // Create a new Produto
  app.post("/produtos", produtos.create);

  // Create a new Produto by idShop
  app.post("/suppliers/shop/createProduct/:idShop", produtos.createByIdShop);

  // Retrieve all Produtos
  app.get("/produtos", produtos.findAll);

  // Retrieve a single Produto with produtoId
  app.get("/produtos/:idProduct", produtos.findOne);

  // Update a Produto with idProduct
  app.put("/produtos/:idProduct", produtos.update);

  // Delete a Produto with idProduct
  app.delete("/produtos/:idProduct", produtos.delete);

  // Delete all Produtos
  app.delete("/produtos", produtos.deleteAll);
};
