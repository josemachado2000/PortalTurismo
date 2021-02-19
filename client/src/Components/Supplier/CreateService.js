// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

// TODO PRODUCTS ------------------------------------------------------------------------------- //
export default function CreateService({ token }) {
  const { idShop } = useParams();
  const [nome, setNome] = useState();
  const [descricao, setDescricao] = useState();
  const [stock, setStock] = useState();
  const [preco, setPreco] = useState();
  const [file, setFile] = useState();

  const createService = async () => {
    await fetch(
      `http://localhost:5000/suppliers/shop/createService/${idShop}`,
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
      `http://localhost:5000/suppliers/servicos/${token.data.user.idUser}`
    );
    const service = await result.json();
    console.log(service);
    var lastIdService = service[service.length - 1].idServico;
    console.log(lastIdService);
    fetch(`http://localhost:5000/service/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastIdService,
        file,
      }),
    });
    window.location.href = `/supplier/shops/services/${idShop}`;
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
        <h3>Criar Serviço</h3>
        <Form.Group style={{ position: "relative", marginTop: "20px" }}>
          <Form.Label>Inserir imagem do Serviço</Form.Label>
          <Form.Control
            type="file"
            name="serviceImage"
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
          onClick={(e) => createService()}
        >
          Criar Serviço
        </Button>
      </Form>
    </div>
  );
}
