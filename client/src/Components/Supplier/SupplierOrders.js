// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";

import { Table, Form, Button } from "react-bootstrap";

// TODO ---------------------------------------------------------------------------------------- //
export default function SupplierOrders({ token }) {
  const [orders, setOrders] = useState();

  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:5000/suppliers/orders/${token.data.user.idUser}`
    );
    const order = await result.json();
    setOrders(order);
  };

  console.log(orders);

  useEffect(() => {
    fetchData();
  }, []);

  var content = null;
  if (orders) {
    content = orders.map((order) => (
      <tr key={order.idLinhaEncomenda}>
        <td style={{ padding: "0px" }}>
          <img
            src={require(`../../assets/images/${order.imagem}`).default}
            alt=""
            style={{
              width: "80px",
              height: "80px",
            }}
          />
        </td>
        <td style={{ verticalAlign: "middle" }}>{order.nome}</td>
        <td style={{ verticalAlign: "middle" }}>{order.dataEncomenda}</td>
        <td style={{ verticalAlign: "middle" }}>{order.preco}€</td>
        <td style={{ verticalAlign: "middle" }}>{order.quantidade}</td>
        <td style={{ verticalAlign: "middle" }}>{order.totalLinha}€</td>
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
        <h3>Encomendas</h3>
      </div>
      <Table responsive="xl">
        <thead>
          <tr>
            <th style={{ width: "60px" }}>Imagem</th>
            <th style={{ width: "150px" }}>Produto</th>
            <th style={{ width: "200px" }}>Data da Encomenda</th>
            <th style={{ width: "60px" }}>Preço</th>
            <th style={{ width: "100px" }}>Quantidade</th>
            <th style={{ width: "60px" }}>Total</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </Table>
    </div>
  );
}
