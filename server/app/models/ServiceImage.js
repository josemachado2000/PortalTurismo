var db = require("./db.js");

// constructor
const ServiceImage = function (serviceImage) {
  this.idFotoServico = serviceImage.idServico;
  this.imagem = serviceImage.imagem;
  this.idServico = serviceImage.idServico;
};

ServiceImage.createServiceImage = (newServiceImage, result) => {
  console.log(newServiceImage);
  db.query(
    "INSERT INTO fotoservico (imagem, idServico) VALUES (?, ?)",
    [newServiceImage.imagem, newServiceImage.idServico],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created service image: ", {
        id: res.insertId,
        ...newServiceImage,
      });
      result(null, { id: res.insertId, ...newServiceImage });
    }
  );
};

// Shop.getShopById = (idShop, result) => {
//   db.query(
//     "SELECT * FROM lojapagina WHERE idLojaPagina = ?",
//     [idShop],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       console.log("Shops: ", res);
//       result(null, res);
//     }
//   );
// };

ServiceImage.updateServiceImageById = (serviceImage, result) => {
  db.query(
    "UPDATE fotoservico SET imagem = ? WHERE idServico = ?",
    [serviceImage.file, serviceImage.idService],
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

      console.log("Updated service image: ", {
        id: serviceImage.idService,
        ...serviceImage,
      });
      result(null, { id: serviceImage.idService, ...serviceImage });
    }
  );
};

// Shop.getShopProductsById = (idShop, result) => {
//   db.query(
//     "SELECT p.* FROM produto p, lojapagina l WHERE l.idLojaPagina = ? AND l.idLojaPagina = p.idLojaPagina",
//     [idShop],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       console.log("Products: ", res);
//       result(null, res);
//     }
//   );
// };

// Shop.getShopServicesById = (idShop, result) => {
//   db.query(
//     "SELECT s.*, fs.imagem FROM servico s, fotoservico fs, lojapagina l WHERE l.idLojaPagina = ? AND l.idLojaPagina = s.idLojaPagina AND s.idServico = fs.idServico",
//     [idShop],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       console.log("Services: ", res);
//       result(null, res);
//     }
//   );
// };

module.exports = ServiceImage;
