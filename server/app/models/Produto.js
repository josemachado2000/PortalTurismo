var db = require("./db.js");

// constructor
const Produto = function (produto) {
  this.nome = produto.nome;
  this.descricao = produto.descricao;
  this.stock = produto.stock;
  this.preco = produto.preco;
};

Produto.create = (newProduto, result) => {
  db.query("INSERT INTO produto SET ?", newProduto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created produto: ", { id: res.insertId, ...newProduto });
    result(null, { id: res.insertId, ...newProduto });
  });
};

Produto.createByIdShop = (idShop, newProduto, result) => {
  db.query(
    "INSERT INTO produto (nome, descricao, stock, preco, idLojaPagina) VALUES (?, ?, ?, ?, ?)",
    [
      newProduto.nome,
      newProduto.descricao,
      newProduto.stock,
      newProduto.preco,
      idShop,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created produto: ", { id: res.insertId, ...newProduto });
      result(null, { id: res.insertId, ...newProduto });
    }
  );
};

Produto.findById = (idProduct, result) => {
  db.query(
    `SELECT p.*, fp.* FROM produto p, fotoproduto fp WHERE p.idProduto = ? AND p.idProduto = fp.idProduto`,
    [idProduct],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found produto: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Produto with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Produto.getAll = (result) => {
  db.query(
    "SELECT p.*, fp.* FROM produto p, fotoproduto fp WHERE p.idProduto = fp.idProduto",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Produtos: ", res);
      result(null, res);
    }
  );
};

Produto.updateById = (id, produto, result) => {
  console.log("product:", produto);
  console.log("id:", id);
  db.query(
    "UPDATE produto SET nome = ?, descricao = ?, stock = ?, preco = ? WHERE idProduto = ?",
    [produto.name, produto.description, produto.stock, produto.price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Produto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated produto: ", { id: id, ...produto });
      result(null, { id: id, ...produto });
    }
  );
};

Produto.remove = (idProduct, result) => {
  db.query("DELETE FROM produto WHERE idProduto = ?", idProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Produto with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted produto com id: ", idProduct);
    result(null, res);
  });
};

Produto.removeAll = (result) => {
  db.query("DELETE FROM produto", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} produtos`);
    result(null, res);
  });
};

module.exports = Produto;
