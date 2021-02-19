// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

// TODO PRODUCTS ------------------------------------------------------------------------------- //
export default function CreateProduct({ token }) {
  const { idShop } = useParams();
  const [nome, setNome] = useState();
  const [descricao, setDescricao] = useState();
  const [stock, setStock] = useState();
  const [preco, setPreco] = useState();
  const [file, setFile] = useState();

  const createProduct = async () => {
    await fetch(
      `http://localhost:5000/suppliers/shop/createProduct/${idShop}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          descricao,
          stock,
          preco,
        }),
      }
    );

    const result = await fetch(
      `http://localhost:5000/suppliers/produtos/${token.data.user.idUser}`
    );
    const product = await result.json();
    var lastIdProduct = product[product.length - 1].idProduto;

    fetch(`http://localhost:5000/product/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastIdProduct,
        file,
      }),
    });
    window.location.href = `/supplier/shops/products/${idShop}`;
  };

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "20px",
        height: "620px",
      }}
    >
      <Form className="form">
        <h3>Criar Produto</h3>
        <Form.Group style={{ position: "relative", marginTop: "20px" }}>
          <Form.Label>Inserir imagem do Produto</Form.Label>
          <Form.Control
            type="file"
            name="productImage"
            onChange={(e) => setFile(e.target.files[0].name)}
            required
          />
        </Form.Group>
        <Form.Group style={{ marginTop: "20px" }}>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setNome(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Preco</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          style={{
            position: "relative",
            float: "right",
            marginTop: "10px",
          }}
          variant="dark"
          onClick={(e) => createProduct()}
        >
          Criar Produto
        </Button>
      </Form>
    </div>
  );
}
