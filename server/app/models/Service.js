var db = require("./db.js");

// constructor
const Service = function (service) {
  this.nome = service.nome;
  this.descricao = service.descricao;
  this.stock = service.stock;
  this.preco = service.preco;
};

Service.createByIdShop = (idShop, newService, result) => {
  db.query(
    "INSERT INTO servico (nome, descricao, stock, preco, idLojaPagina) VALUES (?, ?, ?, ?, ?)",
    [
      newService.nome,
      newService.descricao,
      newService.stock,
      newService.preco,
      idShop,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created produto: ", { id: res.insertId, ...newService });
      result(null, { id: res.insertId, ...newService });
    }
  );
};
// Produto.create = (newProduto, result) => {
//   db.query("INSERT INTO produto SET ?", newProduto, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("Created produto: ", { id: res.insertId, ...newProduto });
//     result(null, { id: res.insertId, ...newProduto });
//   });
// };

Service.findById = (ServiceId, result) => {
  db.query(
    `SELECT s.*, fs.* FROM servico s, fotoservico fs WHERE s.idServico = ${ServiceId} AND s.idServico = fs.idServico`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found service: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Produto with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Service.getAll = (result) => {
  db.query(
    "SELECT s.*, fs.* FROM servico s, fotoservico fs WHERE s.idServico = fs.idServico",
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

Service.updateById = (id, service, result) => {
  console.log(service);
  console.log(id);
  db.query(
    "UPDATE servico SET nome = ?, descricao = ?, stock = ?, preco = ? WHERE idServico = ?",
    [service.name, service.description, service.stock, service.price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Service with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated service: ", { id: id, ...service });
      result(null, { id: id, ...service });
    }
  );
};

// Produto.remove = (id, result) => {
//   db.query("DELETE FROM produto WHERE idProduto = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Produto with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("Deleted produto com id: ", id);
//     result(null, res);
//   });
// };

// Produto.removeAll = (result) => {
//   db.query("DELETE FROM produto", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`Deleted ${res.affectedRows} produtos`);
//     result(null, res);
//   });
// };

module.exports = Service;
