var db = require("./db.js");

// constructor
const ProductImage = function (productImage) {
  this.idFotoProduto = productImage.idFotoProduto;
  this.imagem = productImage.imagem;
  this.idProduto = productImage.idProduto;
};

ProductImage.createProductImage = (newProductImage, result) => {
  console.log(newProductImage);
  db.query(
    "INSERT INTO fotoproduto (imagem, idProduto) VALUES (?, ?)",
    [newProductImage.imagem, newProductImage.idProduto],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created product image: ", {
        id: res.insertId,
        ...newProductImage,
      });
      result(null, { id: res.insertId, ...newProductImage });
    }
  );
};

ProductImage.updateProductImageById = (productImage, result) => {
  db.query(
    "UPDATE fotoproduto SET imagem = ? WHERE idProduto = ?",
    [productImage.file, productImage.idProduct],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated product image: ", {
        id: productImage.idProduct,
        ...productImage,
      });
      result(null, { id: productImage.idProduct, ...productImage });
    }
  );
};

module.exports = ProductImage;
