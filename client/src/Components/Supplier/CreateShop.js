// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";

// TODO ---------------------------------------------------------------------------------------- //
export default function CreateShop({ token }) {
  const [categoria, setCategoria] = useState();
  const [descricao, setDescricao] = useState();
  const [file, setFile] = useState();

  const options = [
    {
      label: "Serviços",
      value: "Serviços",
    },
    {
      label: "Produtos",
      value: "Produtos",
    },
  ];

  useEffect(() => {
    setCategoria("Serviços");
  }, []);

  console.log(file);
  const createShop = async () => {
    var idUser = token.data.user.idUser;
    await fetch(`http://localhost:5000/suppliers/shop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoria,
        descricao,
        idUser,
      }),
    });

    const result = await fetch(
      `http://localhost:5000/suppliers/lojas/${token.data.user.idUser}`
    );
    const shop = await result.json();
    console.log(shop);
    var lastIdShop = shop[shop.length - 1].idLojaPagina;
    console.log(lastIdShop);
    console.log(file);
    fetch(`http://localhost:5000/shop/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastIdShop,
        file,
      }),
    });
    window.location.href = "/supplier/shops";
  };

  // const cancel = () => {
  //   window.location.href = "/supplier/shops";
  // };

  if (categoria) {
    var option = options.find((opt) => opt.label === categoria).value;
    console.log(option);
  }

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "20px",
        height: "400px",
      }}
    >
      <Form className="form">
        <h3>Criar Loja</h3>
        <Form.Group style={{ marginTop: "30px" }}>
          <Form.Label>Escolher foto para a loja</Form.Label>
          <Form.Control
            type="file"
            name="shopImage"
            onChange={(e) => setFile(e.target.files[0].name)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            value={option}
            as="select"
            onChange={(e) => setCategoria(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Group>
        <Button
          style={{
            position: "relative",
            float: "right",
            marginTop: "10px",
          }}
          variant="dark"
          onClick={(e) => createShop()}
        >
          Criar Loja
        </Button>
        {/* <Button
          style={{
            position: "relative",
            float: "left",
            marginTop: "10px",
          }}
          variant="dark"
          onClick={(e) => cancel()}
        >
          Cancelar
        </Button> */}
      </Form>
    </div>
  );
}
