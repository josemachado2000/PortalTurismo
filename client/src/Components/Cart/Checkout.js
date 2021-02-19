import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Table, Button } from "react-bootstrap";
import { clearBasket } from "../../Actions/basketActions";

function Checkout(props) {
  const [moradaEntrega, setMoradaEntrega] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `http://localhost:5000/users/${props.token.data.user.idUser}`
      );
      const user = await result.json();
      console.log(user);
      setMoradaEntrega(user.morada);
    };
    fetchData();
  }, []);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  var dataEncomenda = new Date().toLocaleDateString("pt-PT", options);
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  var date = new Date();
  var dataEntrega = date.addDays(5).toLocaleDateString("pt-PT", options);

  const cartTotal = () => {
    var total = 0;

    props.cartProducts.map((prod) => {
      total += prod.preco * prod.quantity;
    });

    return total.toFixed(2);
  };

  const sendOrder = async () => {
    var idUser = props.token.data.user.idUser;
    var valorTotal = cartTotal();

    await fetch(`http://localhost:5000/client/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataEncomenda,
        dataEntrega,
        valorTotal,
        idUser,
      }),
    });

    const result = await fetch(`http://localhost:5000/orders/${idUser}`);
    const orders = await result.json();
    var lastIdEncomenda = orders[orders.length - 1].idEncomenda;
    console.log(lastIdEncomenda);
    props.cartProducts.map((prod) => {
      var quantidade = prod.quantity;
      var totalLinha = prod.preco * prod.quantity;
      var idProduto = prod.idProduto;
      fetch(`http://localhost:5000/orderLine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantidade,
          totalLinha,
          lastIdEncomenda,
          idProduto,
        }),
      }).then(() => {
        window.location.href = "/client/products";
        props.clearBasket();
      });
    });
  };

  var content = null;
  if (props.cartProducts) {
    content = props.cartProducts.map((prod) => (
      <tr key={prod.idProduto}>
        <td style={{ verticalAlign: "middle", width: "350px" }}>{prod.nome}</td>
        <td style={{ verticalAlign: "middle", width: "150px" }}>
          {prod.preco.toFixed(2)}€
        </td>
        <td style={{ verticalAlign: "middle", width: "150px" }}>
          {prod.quantity}
        </td>
        <td style={{ verticalAlign: "middle", width: "150px" }}>
          {(prod.preco * prod.quantity).toFixed(2)}€
        </td>
      </tr>
    ));
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        margin: "20px",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <h3>Finalizar Compra</h3>
      <h5 style={{ marginTop: "30px" }}>Dados da Entrega</h5>
      <div style={{ display: "flex" }}>
        <Form.Group style={{ width: "50%" }}>
          <Form.Label>Data da Encomenda</Form.Label>
          <Form.Control disabled defaultValue={dataEncomenda} />
        </Form.Group>
        <Form.Group style={{ width: "50%", paddingLeft: "20px" }}>
          <Form.Label>Data prevista da Entrega</Form.Label>
          <Form.Control
            disabled
            defaultValue={dataEntrega + " (dentro de 5 dias)"}
          />
        </Form.Group>
      </div>
      <Form.Group style={{ width: "50%" }}>
        <Form.Label>Morada</Form.Label>
        <Form.Control defaultValue={moradaEntrega} />
      </Form.Group>
      <h5 style={{ marginTop: "30px" }}>Produtos</h5>
      <Table responsive="sm">
        <thead>
          <tr>
            <th style={{ width: "350px" }}>Produto</th>
            <th style={{ width: "150px" }}>Preço</th>
            <th style={{ width: "150px" }}>Quantidade</th>
            <th style={{ width: "150px" }}>Total</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
        <tfoot>
          <tr>
            <td colSpan="5" style={{ paddingLeft: "82.6%" }}>
              <b>{cartTotal()}€</b>
            </td>
          </tr>
        </tfoot>
      </Table>
      <div style={{ position: "relative", height: "35px" }}>
        <Button
          variant="light"
          style={{
            position: "absolute",
            marginRight: "60px",
            height: "35px",
            marginBottom: "0px",
            right: "0",
          }}
          onClick={() => sendOrder()}
        >
          Finalizar Encomenda
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartProducts: state.basketState.cart,
});

export default connect(mapStateToProps, { clearBasket })(Checkout);
