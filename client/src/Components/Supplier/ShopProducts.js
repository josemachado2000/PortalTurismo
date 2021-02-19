// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { MDBCol, MDBIcon } from "mdbreact";
import "../../Components/Products/Products.css";
import { Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";

// TODO ---------------------------------------------------------------------------------------- //
export default function ShopProducts() {
  const { idShop } = useParams();
  const [products, setProducts] = useState();

  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:5000/suppliers/shops/products/${idShop}`
    );
    const prod = await result.json();
    setProducts(prod);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const removeProduct = (product) => {
    Swal.fire({
      title: "Pretende eliminar este produto?",
      text: "Não poderá desfazer esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/produtos/${product.idProduto}`, {
          method: "DELETE",
        }).then(() => fetchData());
        Swal.fire("Eliminado!", "O produto foi eliminado.", "success");
      }
    });
  };

  var content = null;
  console.log(products);
  if (!products) {
    content = (
      <div>
        <h3>Não existem produtos nesta loja!</h3>
      </div>
    );
  }
  if (products) {
    const results = products.filter((prod) =>
      prod.nome.toLowerCase().includes(searchTerm)
    );
    content = results.map((product) => (
      <div key={product.idProduto}>
        <Card style={{ borderRadius: "10px" }}>
          <a
            style={{
              position: "absolute",
              paddingLeft: "5px",
              paddingTop: "5px",
            }}
            onClick={() => removeProduct(product)}
          >
            <i className="fas fa-trash-alt fa-lg"></i>
          </a>
          <Card.Img
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            variant="top"
            src={require(`../../assets/images/${product.imagem}`).default}
            alt=""
          />
          <Card.Body>
            <Card.Title style={{ height: "50px" }}>{product.nome}</Card.Title>
            <Card.Text style={{ height: "60px", marginBottom: "10px" }}>
              {product.descricao}
            </Card.Text>
            <Card.Text style={{ height: "25px", marginBottom: "0px" }}>
              Stock: {product.stock}
            </Card.Text>
            <Card.Text style={{ height: "25px" }}>
              Preço: {product.preco}€
            </Card.Text>
            <Link to={`/supplier/shops/product/${idShop}&${product.idProduto}`}>
              <Button
                variant="dark"
                size="sm"
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  marginBottom: "0px",
                  width: "100%",
                  height: "30px",
                  padding: "5px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                Alterar Produto
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  return (
    <div style={{ margin: "20px", padding: "20px", borderRadius: "20px" }}>
      <h3>Produtos</h3>
      <MDBCol md="6">
        <div
          className="input-group md-form form-sm form-1 pl-0"
          style={{ width: "500px" }}
        >
          <div className="input-group-prepend">
            <span
              className="input-group-text purple lighten-3"
              id="basic-text1"
            >
              <MDBIcon className="text-white" icon="search" />
            </span>
          </div>
          <input
            className="form-control my-0 py-1"
            type="text"
            placeholder="Pesquisar produto"
            value={searchTerm}
            onChange={handleChange}
            aria-label="Search"
          />
          <Link to={`/supplier/shops/createProduct/${idShop}`}>
            <Button
              style={{
                position: "absolute",
                marginBottom: "0px",
                marginLeft: "50px",
              }}
              variant="light"
            >
              Criar Produto
            </Button>
          </Link>
        </div>
      </MDBCol>
      <div className="productsList">{content}</div>
    </div>
  );
}
