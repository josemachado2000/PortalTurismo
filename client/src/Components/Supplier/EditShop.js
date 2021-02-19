// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

// TODO ---------------------------------------------------------------------------------------- //
export default function EditShop() {
  const { idShop } = useParams();
  const [categoria, setCategoria] = useState();
  const [descricao, setDescricao] = useState();
  const [file, setFile] = useState();
  // const [shop, setShop] = useState();

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
    const fetchShop = async () => {
      const result = await fetch(
        `http://localhost:5000/suppliers/shop/${idShop}`
      );
      const shop = await result.json();
      // setShop(shop[0]);
      setFile(shop[0].imagem);
      setCategoria(shop[0].categoria);
      setDescricao(shop[0].descricao);
    };
    fetchShop();
  }, []);

  const updateShop = (idShop) => {
    fetch(`http://localhost:5000/suppliers/shop/${idShop}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoria,
        descricao,
      }),
    });
    fetch(`http://localhost:5000/shop/image`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idShop,
        file,
      }),
    });
    window.location.href = "/supplier/shops";
  };

  var content = null;
  if (file && categoria && descricao) {
    var option = options.find((opt) => opt.label === categoria).value;
    console.log(option);
    content = (
      <Form className="form">
        <h3>Editar Loja</h3>
        <img
          src={require(`../../assets/images/${file}`).default}
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "10px",
          }}
          alt=""
        />
        <Form.Group
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            marginLeft: "400px",
            marginTop: "375px",
          }}
        >
          <Form.Label>Alterar foto da loja</Form.Label>
          <Form.Control
            type="file"
            name="shopImage"
            onChange={(e) => setFile(e.target.files[0].name)}
          />
        </Form.Group>
        <Form.Group style={{ marginTop: "20px" }}>
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
          onClick={(e) => updateShop(idShop)}
        >
          Atualizar Loja
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
    );
  }

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
      {content}
    </div>
  );
}
