// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";

import { Table, Modal, Button } from "react-bootstrap";

function ModalOrder(props) {
  var content = null;
  if (props.order) {
    console.log(props.order);
    content = props.order.map((order) => (
      <tr key={order.idLinhaEncomenda}>
        <td style={{ verticalAlign: "middle", padding: "0px", width: "80px" }}>
          <img
            src={require(`../../assets/images/${order.imagem}`).default}
            style={{ width: "80px", height: "80px" }}
          />
        </td>
        <td style={{ verticalAlign: "middle", width: "150px" }}>
          {order.nome}
        </td>
        <td style={{ verticalAlign: "middle", width: "60px" }}>
          {order.preco}€
        </td>
        <td style={{ verticalAlign: "middle", width: "100px" }}>
          {order.quantidade}
        </td>
        <td style={{ verticalAlign: "middle", width: "60px" }}>
          {order.totalLinha.toFixed(2)}€
        </td>
      </tr>
    ));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Encomenda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive="xl">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>Imagem</th>
              <th style={{ width: "150px" }}>Produto</th>
              <th style={{ width: "60px" }}>Preço</th>
              <th style={{ width: "100px" }}>Quantidade</th>
              <th style={{ width: "60px" }}>Total</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer style={{ height: "70px" }}>
        <Button variant="dark" onClick={props.onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// TODO ---------------------------------------------------------------------------------------- //
export default function ClientOrders({ token }) {
  const [orders, setOrders] = useState();
  const [orderModal, setOrderModal] = useState();
  const [modalShow, setModalShow] = useState(false);

  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:5000/clients/orders/${token.data.user.idUser}`
    );
    const order = await result.json();
    setOrders(order);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const visualizeOrder = async (o) => {
    console.log(o);
    const result = await fetch(
      `http://localhost:5000/clients/order/${o.idEncomenda}`
    );
    const order = await result.json();
    setOrderModal(order);
    setModalShow(true);
  };

  var content = null;
  if (orders) {
    // console.log(orders);
    content = orders.map((order) => (
      <tr key={order.idEncomenda}>
        <td style={{ verticalAlign: "middle" }}>{order.idEncomenda}</td>
        <td style={{ verticalAlign: "middle" }}>{order.dataEncomenda}</td>
        <td style={{ verticalAlign: "middle" }}>{order.dataEntrega}</td>
        <td style={{ verticalAlign: "middle" }}>
          {order.valorTotal.toFixed(2)}€
        </td>
        <td style={{ textAlign: "center" }}>
          <Button
            variant="dark"
            size="sm"
            style={{ position: "relative", marginBottom: "0px" }}
            // onClick={() => visualizeOrder(order)}
            onClick={() => visualizeOrder(order)}
          >
            Visualizar
          </Button>
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
        <h3>Encomendas</h3>
      </div>
      <Table responsive="xl">
        <thead>
          <tr>
            <th style={{ width: "60px" }}>#</th>
            <th style={{ width: "200px" }}>Data da Encomenda</th>
            <th style={{ width: "200px" }}>Data da Entrega</th>
            <th style={{ width: "60px" }}>Total</th>
            <th style={{ width: "150px" }}></th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </Table>
      <ModalOrder
        show={modalShow}
        order={orderModal}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
