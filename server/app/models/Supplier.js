var db = require("./db.js");

// constructor
const Supplier = function (sup) {
  this.idFornLoj = sup.idFornLoj;
  this.nomeApp = sup.nomeApp;
  this.estado = sup.estado;
  this.idUser = sup.idUser;
};

Supplier.createSupplier = (newSupplier, username, result) => {
  db.query(
    "INSERT INTO fornloj (nomeApp, estado, idUser) VALUE (?, ?, (SELECT idUser FROM user where username = ?))",
    [newSupplier.nomeApp, newSupplier.estado, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created supplier: ", { id: res.insertId, ...newSupplier });
      result(null, { id: res.insertId, ...newSupplier });
    }
  );
};

Supplier.getShops = (idUser, result) => {
  db.query(
    "SELECT l.*, flp.* FROM lojapagina l, fotolojapagina flp, fornloj f WHERE f.idUser = ? AND f.idFornLoj = l.idFornLoj AND l.idLojaPagina = flp.idLojaPagina",
    [idUser],
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

Supplier.getLojas = (idUser, result) => {
  db.query(
    "SELECT l.* FROM lojapagina l, fornloj f WHERE f.idUser = ? AND f.idFornLoj = l.idFornLoj",
    [idUser],
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

Supplier.getProducts = (idUser, result) => {
  db.query(
    "SELECT p.*, fp.*, l.* FROM produto p, fotoproduto fp, fornloj fl, lojapagina l, user u WHERE u.idUser = ? AND u.idUser = fl.idUser AND fl.idFornLoj = l.idFornLoj AND l.idLojaPagina = p.idLojaPagina AND p.idProduto = fp.idProduto",
    [idUser],
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

Supplier.getServices = (idUser, result) => {
  db.query(
    "SELECT s.*, fs.*, l.* FROM servico s, fotoservico fs, fornloj fl, lojapagina l, user u WHERE u.idUser = ? AND u.idUser = fl.idUser AND fl.idFornLoj = l.idFornLoj AND l.idLojaPagina = s.idLojaPagina AND s.idServico = fs.idServico",
    [idUser],
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

Supplier.getOrders = (idUser, result) => {
  db.query(
    "SELECT le.*, p.*, fp.imagem, e.dataEncomenda FROM linhaencomenda le, encomenda e, fotoproduto fp, produto p, lojapagina lp, fornloj f WHERE f.idUser = ? AND f.idFornLoj = lp.idFornLoj AND lp.idLojaPagina = p.idlojaPagina AND p.idProduto = le.idProduto AND p.idProduto = fp.idProduto AND le.idEncomenda = e.idEncomenda",
    [idUser],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Orders: ", res);
      result(null, res);
    }
  );
};

Supplier.getProductsByidUser = (idUser, result) => {
  db.query(
    "SELECT p.* FROM produto p, fornLoj f, lojapagina l WHERE f.idUser = ? AND f.idFornLoj = l.idFornLoj AND l.idLojaPagina = p.idLojaPagina ORDER BY p.idProduto",
    [idUser],
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

Supplier.getServicesByidUser = (idUser, result) => {
  db.query(
    "SELECT s.* FROM servico s, fornLoj f, lojapagina l WHERE f.idUser = ? AND f.idFornLoj = l.idFornLoj AND l.idLojaPagina = s.idLojaPagina ORDER BY s.idServico",
    [idUser],
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

module.exports = Supplier;
