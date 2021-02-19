var db = require("./db.js");

// constructor
const Shop = function (shop) {
  this.idLojaPagina = shop.idLojaPagina;
  this.categoria = shop.categoria;
  this.descricao = shop.descricao;
  this.idFornLoj = shop.idFornLoj;
};

Shop.createShop = (newShop, idUser, result) => {
  db.query(
    "INSERT INTO lojapagina (categoria, descricao, idFornLoj) VALUES (?, ?, (SELECT f.idFornLoj FROM fornloj f, user u where u.idUser = ? AND u.idUser = f.idUser))",
    [newShop.categoria, newShop.descricao, idUser],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created shop: ", { id: res.insertId, ...newShop });
      result(null, { id: res.insertId, ...newShop });
    }
  );
};

Shop.getShopById = (idShop, result) => {
  db.query(
    "SELECT l.*, f.* FROM lojapagina l, fotolojapagina f WHERE l.idLojaPagina = ? AND l.idLojaPagina = f.idLojaPagina",
    [idShop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Shops: ", res);
      result(null, res);
    }
  );
};

Shop.updateShopById = (idShop, shop, result) => {
  console.log(shop);
  db.query(
    "UPDATE lojapagina SET categoria = ?, descricao = ? WHERE idLojaPagina = ?",
    [shop.categoria, shop.descricao, idShop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Shop with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated shop: ", { id: idShop, ...shop });
      result(null, { id: idShop, ...shop });
    }
  );
};

Shop.getShopProductsById = (idShop, result) => {
  db.query(
    "SELECT p.*, fp.imagem FROM produto p, fotoproduto fp, lojapagina l WHERE l.idLojaPagina = ? AND l.idLojaPagina = p.idLojaPagina AND p.idProduto = fp.idProduto",
    [idShop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Products: ", res);
      result(null, res);
    }
  );
};

Shop.getShopServicesById = (idShop, result) => {
  db.query(
    "SELECT s.*, fs.imagem FROM servico s, fotoservico fs, lojapagina l WHERE l.idLojaPagina = ? AND l.idLojaPagina = s.idLojaPagina AND s.idServico = fs.idServico",
    [idShop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Services: ", res);
      result(null, res);
    }
  );
};

module.exports = Shop;
