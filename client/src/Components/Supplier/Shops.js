// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

// TODO ---------------------------------------------------------------------------------------- //
export default function Shops({ token }) {
  const [shops, setShops] = useState();
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:5000/suppliers/shops/${token.data.user.idUser}`
    );
    const shop = await result.json();
    setShops(shop);
  };

  console.log(shops);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const shopProducts = (id, estado) => {
  //   console.log(id);
  //   console.log(estado);

  //   axios
  //     .put(`http://localhost:5000/suppliers/${id}&${estado}`)
  //     .then(() => fetchData());
  // };

  var content = null;
  if (shops) {
    const results = shops.filter((shop) =>
      shop.descricao.toLowerCase().includes(searchTerm)
    );
    console.log(results);
    content = results.map((shop) => {
      if (shop.categoria === "Serviços") {
        return (
          <tr key={shop.idLojaPagina}>
            <td
              style={{
                width: "150px",
                height: "90px",
                padding: "0px",
              }}
            >
              <img
                src={require(`../../assets/images/${shop.imagem}`).default}
                alt=""
                style={{
                  width: "150px",
                  height: "90px",
                }}
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>{shop.categoria}</td>
            <td style={{ verticalAlign: "middle" }}>{shop.descricao}</td>
            <td
              style={{
                textAlign: "center",
                verticalAlign: "middle",
                width: "300px",
              }}
            >
              <Link to={`/supplier/shops/edit/${shop.idLojaPagina}`}>
                <Button
                  style={{
                    position: "relative",
                    marginBottom: "0px",
                    marginRight: "25px",
                  }}
                  variant="light"
                >
                  Editar loja
                </Button>
              </Link>
              <Link to={`/supplier/shops/services/${shop.idLojaPagina}`}>
                <Button
                  style={{
                    position: "relative",
                    marginBottom: "0px",
                  }}
                  variant="light"
                >
                  Serviços
                </Button>
              </Link>
            </td>
          </tr>
        );
      }
      if (shop.categoria === "Produtos") {
        return (
          <tr key={shop.idLojaPagina}>
            <td
              style={{
                width: "150px",
                height: "90px",
                padding: "0px",
              }}
            >
              <img
                src={require(`../../assets/images/${shop.imagem}`).default}
                alt=""
                style={{
                  width: "150px",
                  height: "90px",
                }}
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>{shop.categoria}</td>
            <td style={{ verticalAlign: "middle" }}>{shop.descricao}</td>
            <td
              style={{
                textAlign: "center",
                verticalAlign: "middle",
                width: "300px",
              }}
            >
              <Link to={`/supplier/shops/edit/${shop.idLojaPagina}`}>
                <Button
                  style={{
                    position: "relative",
                    marginBottom: "0px",
                  }}
                  variant="light"
                >
                  Editar loja
                </Button>
              </Link>
              <Link to={`/supplier/shops/products/${shop.idLojaPagina}`}>
                <Button
                  style={{
                    position: "relative",
                    marginBottom: "0px",
                    marginLeft: "20px",
                  }}
                  variant="light"
                >
                  Produtos
                </Button>
              </Link>
            </td>
          </tr>
        );
      }
    });
  }

  return (
    <div style={{ margin: "20px", padding: "20px", borderRadius: "20px" }}>
      <h3>Lojas</h3>
      <input
        className="form-control my-0 py-1"
        type="text"
        placeholder="Pesquisar loja"
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search"
      />
      <Table
        style={{ marginTop: "10px" }}
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {content}
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              <Link to={`/supplier/shop/create`}>
                <Button
                  style={{
                    position: "relative",
                    margin: "0px",
                  }}
                  variant="light"
                >
                  Criar Loja
                </Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
