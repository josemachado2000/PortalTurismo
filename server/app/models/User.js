var db = require("./db.js");

// constructor
const User = function (user) {
  this.idUser = user.idUser;
  this.username = user.username;
  this.password = user.password;
  this.nome = user.nome;
  this.dataNascimento = user.dataNascimento;
  this.morada = user.morada;
  this.email = user.email;
  this.contacto = user.contacto;
  this.nacionalidade = user.nacionalidade;
  this.biografia = user.biografia;
};

User.getUserLogin = (username, password, result) => {
  var contaResNulos = 0;

  db.query(
    `SELECT a.nomeApp, u.username, u.idUser from admin a, user u where u.username = ? and u.password = ? and u.idUser = a.idUser;`,
    [username, password],
    (err, res) => {
      if (err) {
        console.log("Error Admin: ", err);
        result(err, null);
        return;
      }
      console.log("Admin Res: " + res);
      if (res.length === 0) {
        contaResNulos++;
      }
      if (res.length) {
        var data = {
          user: res[0],
          userType: "admin",
        };
        console.log("Found admin: ", data);
        result(null, data);
        return;
      }
    }
  );

  db.query(
    `SELECT c.nomeApp, u.username, u.idUser from cliente c, user u where u.username = ? and u.password = ? and u.idUser = c.idUser;`,
    [username, password],
    (err, res) => {
      if (err) {
        console.log("Error Client: ", err);
        result(err, null);
        return;
      }
      console.log("Client Res: " + res);
      if (res.length === 0) {
        contaResNulos++;
      }
      if (res.length) {
        var data = {
          user: res[0],
          userType: "client",
        };
        console.log("Found client: ", data);
        result(null, data);
        console.log(result);
        return;
      }
    }
  );

  db.query(
    `SELECT fl.nomeApp, fl.estado, u.username, u.idUser from fornLoj fl, user u where u.username = ? and u.password = ? and u.idUser = fl.idUser;`,
    [username, password],
    (err, res) => {
      if (err) {
        console.log("Error FornLoj: ", err);
        result(err, null);
        return;
      }
      console.log("FornLoj Res: " + res);
      if (res.length === 0) {
        contaResNulos++;
        console.log(
          "Res Nulos: " +
            contaResNulos +
            "\n---------------------------------------------------------------------------------------------------------------------"
        );
        if (contaResNulos === 3) {
          result({ kind: "not_found" }, null);
          return;
        }
      }

      if (res.length) {
        // if (res[0].estado === "Inativo") {
        //   result("A sua conta foi inativada!", null);
        //   return;
        // } else {
        var data = {
          user: res[0],
          userType: "supplier",
        };
        console.log("Found fornLoj: ", data);
        result(null, data);
        return;
        // }
      }
    }
  );
};

User.create = (newUser, result) => {
  db.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (UserId, result) => {
  db.query(`SELECT * FROM user WHERE idUser = ${UserId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (result) => {
  db.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

User.getAllSuppliers = (result) => {
  db.query(
    "SELECT f.*, u.* FROM user u, fornLoj f WHERE u.idUser = f.idUser;",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Suppliers: ", res);
      result(null, res);
    }
  );
};

User.updateById = (id, user, result) => {
  console.log(user);
  db.query(
    "UPDATE user SET username = ?, password = ?, nome = ?, dataNascimento = ?, morada = ?, email = ?, contacto = ?, nacionalidade = ?, biografia = ? WHERE idUser = ?",
    [
      user.username,
      user.password,
      user.name,
      user.birthdayDate,
      user.address,
      user.email,
      user.contact,
      user.nacionality,
      user.biography,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.updateEstadoSupplierById = (id, estado, result) => {
  if (estado === "Ativo") {
    db.query(
      "UPDATE fornloj SET estado = ? WHERE idFornLoj = ?",
      ["Inativo", id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Supplier with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("Updated supplier: ", { id: id, estado: "Inativo" });
        result(null, { id: id, estado: "Inativo" });
      }
    );
  }
  if (estado === "Inativo") {
    db.query(
      "UPDATE fornloj SET estado = ? WHERE idFornLoj = ?",
      ["Ativo", id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Supplier with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("Updated supplier: ", { id: id, estado: "Ativo" });
        result(null, { id: id, estado: "Ativo" });
      }
    );
  }
};

User.remove = (id, result) => {
  db.query("DELETE FROM user WHERE idUser = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted user com id: ", id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  db.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
