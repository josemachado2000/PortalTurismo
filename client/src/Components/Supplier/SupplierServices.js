// TODO IMPORTS -------------------------------------------------------------------------------- //
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MDBCol, MDBIcon } from "mdbreact";
import "../../Components/Products/Products.css";
import { Card, Button } from "react-bootstrap";

// TODO ---------------------------------------------------------------------------------------- //
export default function SupplierServices({ token }) {
  const [services, setServices] = useState();

  const fetchData = async () => {
    const result = await fetch(
      `http://localhost:5000/suppliers/services/${token.data.user.idUser}`
    );
    const serv = await result.json();
    setServices(serv);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  var content = null;
  if (services) {
    console.log(services);
    const results = services.filter((serv) =>
      serv.nome.toLowerCase().includes(searchTerm)
    );
    content = results.map((service) => (
      <div key={service.idServico}>
        <Card style={{ borderRadius: "10px" }}>
          <Card.Img
            variant="top"
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            src={require(`../../assets/images/${service.imagem}`).default}
            alt=""
          />
          <Card.Body>
            <Card.Title style={{ height: "50px" }}>{service.nome}</Card.Title>
            <Card.Text style={{ height: "50px", marginBottom: "0px" }}>
              {service.descricao}
            </Card.Text>
            <Card.Text style={{ height: "25px", marginBottom: "10px" }}>
              Categoria: {service.categoria}
            </Card.Text>
            <Card.Text style={{ height: "25px", marginBottom: "0px" }}>
              Stock: {service.stock}
            </Card.Text>
            <Card.Text style={{ height: "25px" }}>
              Preço: {service.preco}€
            </Card.Text>
            <Link to={`/supplier/services/${service.idServico}`}>
              <Button
                variant="dark"
                size="sm"
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  marginBottom: "0px",
                  width: "100%",
                  height: "30px",
                  padding: "5px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                Ver Serviço
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  return (
    <div style={{ margin: "20px", padding: "20px", borderRadius: "20px" }}>
      <h3>Serviços</h3>
      <MDBCol md="6">
        <div
          className="input-group md-form form-sm form-1 pl-0"
          style={{ width: "500px" }}
        >
          <div className="input-group-prepend">
            <span
              className="input-group-text purple lighten-3"
              id="basic-text1"
            >
              <MDBIcon className="text-white" icon="search" />
            </span>
          </div>
          <input
            className="form-control my-0 py-1"
            type="text"
            placeholder="Pesquisar produto"
            value={searchTerm}
            onChange={handleChange}
            aria-label="Search"
          />
          {/* <Link to={`/supplier/shops/addService`}>
            <Button
              style={{
                position: "absolute",
                marginBottom: "0px",
                marginLeft: "50px",
              }}
              variant="light"
            >
              Criar Serviço
            </Button>
          </Link> */}
        </div>
      </MDBCol>
      <div className="productsList">{content}</div>
    </div>
  );
}
