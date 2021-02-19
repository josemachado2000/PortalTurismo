var db = require("./db.js");

// constructor
const ShopImage = function (shopImage) {
  this.idFotoLojaPagina = shopImage.idFotoLojaPagina;
  this.imagem = shopImage.imagem;
  this.idLojaPagina = shopImage.idLojaPagina;
};

ShopImage.createShopImage = (idShop, newShopImage, result) => {
  console.log(idShop);
  console.log(newShopImage);
  db.query(
    "INSERT INTO fotolojapagina (imagem, idLojaPagina) VALUES (?, ?)",
    [newShopImage.imagem, idShop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created shop: ", { id: res.insertId, ...newShopImage });
      result(null, { id: res.insertId, ...newShopImage });
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

ShopImage.updateShopImageById = (shopImage, result) => {
  db.query(
    "UPDATE fotolojapagina SET imagem = ? WHERE idLojaPagina = ?",
    [shopImage.file, shopImage.idShop],
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

      console.log("Updated shop: ", { id: shopImage.idShop, ...shopImage });
      result(null, { id: shopImage.idShop, ...shopImage });
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

module.exports = ShopImage;
