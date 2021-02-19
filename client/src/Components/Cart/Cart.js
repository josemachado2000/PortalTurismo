import React from "react";
import { connect } from "react-redux";
import { Table, Button } from "react-bootstrap";
import {
  removeProductBasket,
  adjustProductQuantity,
  clearBasket,
} from "../../Actions/basketActions";

function Cart(props) {
  console.log(props);

  const cartTotal = () => {
    var total = 0;

    props.cartProducts.map((prod) => {
      total += prod.preco * prod.quantity;
    });

    return <b>{total.toFixed(2)}€</b>;
  };

  const checkout = () => {
    if (!props.token) {
      window.location.href = "/signup";
    } else {
      if (props.cartProducts.length === 0) {
        alert("O carrinho está vazio!");
      } else {
        window.location.href = "/client/checkout";
      }
    }
  };

  var content = null;
  if (props.cartProducts) {
    content = props.cartProducts.map((prod) => (
      <tr key={prod.idProduto}>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            width: "56px",
          }}
        >
          <a onClick={() => props.removeProductBasket(prod)}>
            <i className="fas fa-times-circle fa-lg"></i>
          </a>
        </td>
        <td style={{ width: "100px  " }}>
          <img
            src={require(`../../assets/images/${prod.imagem}`).default}
            style={{ width: "50px", height: "50px" }}
          />
        </td>
        <td style={{ verticalAlign: "middle", width: "350px" }}>{prod.nome}</td>
        <td style={{ verticalAlign: "middle", width: "150px" }}>
          {prod.preco.toFixed(2)}€
        </td>
        <td style={{ verticalAlign: "middle", width: "150px" }}>
          <a onClick={() => props.adjustProductQuantity(prod, "DECREASE")}>
            <i
              className="fas fa-arrow-circle-down fa-lg"
              style={{ paddingRight: "15px" }}
            ></i>
          </a>
          {prod.quantity}
          <a onClick={() => props.adjustProductQuantity(prod, "INCREASE")}>
            <i
              className="fas fa-arrow-circle-up fa-lg"
              style={{ paddingLeft: "15px" }}
            ></i>
          </a>
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
      <div
        style={{ display: "flex", position: "relative", marginBottom: "20px" }}
      >
        <h3>Carrinho</h3>
        <Button
          variant="light"
          style={{
            position: "absolute",
            marginRight: "60px",
            marginBottom: "0px",
            height: "35px",
            top: "0",
            right: "0",
          }}
          onClick={() => props.clearBasket()}
        >
          Limpar Carrinho
        </Button>
      </div>
      <Table responsive="xl">
        <thead>
          <tr>
            <th style={{ width: "56px" }}></th>
            <th style={{ width: "100px" }}>Imagem</th>
            <th style={{ width: "350px" }}>Produto</th>
            <th style={{ width: "150px" }}>Preço</th>
            <th style={{ width: "150px" }}>Quantidade</th>
            <th style={{ width: "150px" }}>Total</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
        <tfoot>
          <tr>
            <td colSpan="6" style={{ paddingLeft: "85.5%" }}>
              {cartTotal()}
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
          onClick={() => checkout()}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartProducts: state.basketState.cart,
});

export default connect(mapStateToProps, {
  removeProductBasket,
  adjustProductQuantity,
  clearBasket,
})(Cart);
