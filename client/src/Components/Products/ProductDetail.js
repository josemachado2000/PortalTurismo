// TODO IMPORTS -------------------------------------------------------------------------------- //
import React from "react";
import { useParams } from "react-router-dom";
import { useAxiosGet } from "../../Hooks/HttpRequests";

import { Card, Button } from "react-bootstrap";
import "./Products.css";

// TODO PRODUCT -------------------------------------------------------------------------------- //
export default function ProductDetail() {
  const { idProduto } = useParams();
  const url = `http://localhost:5000/produtos/${idProduto}`;
  const product = useAxiosGet(url);

  console.log(product);
  let content = null;
  if (product.data) {
    content = (
      <Card>
        <Card.Img
          variant="top"
          src={require(`../../assets/images/${product.data.imagem}`).default}
          alt=""
        />
        <Card.Body>
          <Card.Title>{product.data.nome}</Card.Title>
          <Card.Text>{product.data.descricao}</Card.Text>
          <Card.Text>{product.data.preco}€</Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    );
  }

  return <div className="productPage">{content}</div>;
}
