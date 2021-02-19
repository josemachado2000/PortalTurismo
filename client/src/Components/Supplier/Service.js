// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

// TODO PRODUCTS ------------------------------------------------------------------------------- //
export default function Service() {
  // const { idShop } = useParams();
  const { idService } = useParams();
  const [service, setService] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [file, setFile] = useState();

  const fetchData = async () => {
    const result = await fetch(`http://localhost:5000/services/${idService}`);
    const serv = await result.json();
    setService(serv);
    setName(serv.nome);
    setDescription(serv.descricao);
    setStock(serv.stock);
    setPrice(serv.preco);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateService = (e) => {
    console.log(name);
    console.log(description);
    console.log(stock);
    console.log(price);
    console.log(file);
    fetch(`http://localhost:5000/services/${idService}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        stock,
        price,
      }),
    });
    fetch(`http://localhost:5000/service/image`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idService,
        file,
      }),
    }).then(() => fetchData());
    window.location.href = "/supplier/services";
  };

  var content = null;
  if (service) {
    content = (
      <Card
        style={{
          width: "97%",
          padding: "20px",
          margin: "20px",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <h3>Alterar Serviço</h3>
        <Row>
          <Col>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Card.Img
                variant="top"
                src={require(`../../assets/images/${service.imagem}`).default}
                alt=""
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "20px",
                  marginTop: "20px",
                }}
              />
              <Form.Label style={{ marginTop: "15px" }}>
                Alterar foto da loja
              </Form.Label>
              <Form.Control
                type="file"
                name="shopImage"
                onChange={(e) => setFile(e.target.files[0].name)}
              />
            </div>
          </Col>
          <Col>
            <Card.Body style={{ paddingRight: "0px" }}>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Col>
        </Row>
        <Button
          style={{
            position: "absolute",
            right: "0",
            marginBottom: "20px",
            marginRight: "20px",
          }}
          variant="dark"
          onClick={(e) => updateService()}
        >
          Guardar
        </Button>
        {/* <Button
          style={{
            position: "absolute",
            left: "0",
            marginBottom: "20px",
            marginLeft: "20px",
          }}
          variant="light"
          onClick={(e) => cancel()}
        >
          Cancelar
        </Button> */}
      </Card>
    );
  }

  return <div>{content}</div>;
}
