// TODO IMPORTS -------------------------------------------------------------------------------- //
import React from "react";
import { useAxiosGet } from "../../Hooks/HttpRequests";
import { Link } from "react-router-dom";

import { MDBCol, MDBIcon } from "mdbreact";
import "../../Components/Products/Products.css";
import { Card, Button } from "react-bootstrap";
import { Rating } from "@material-ui/lab";

// TODO PRODUCTS ------------------------------------------------------------------------------- //
export default function Services() {
  const url = `http://localhost:5000/services`;
  var services = useAxiosGet(url);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  var content = null;
  if (services.data) {
    const results = services.data.filter((serv) =>
      serv.nome.toLowerCase().includes(searchTerm)
    );
    content = results.map((service) => (
      <div key={service.idServico}>
        <Card style={{ borderRadius: "10px" }}>
          <Card.Img
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            variant="top"
            src={require(`../../assets/images/${service.imagem}`).default}
            alt=""
          />
          <Card.Body>
            <Card.Title style={{ height: "50px" }}>{service.nome}</Card.Title>
            <Card.Text style={{ height: "60px" }}>
              {service.descricao}
            </Card.Text>
            <Card.Text style={{ height: "30px" }}>
              {service.preco}€ por pessoa
            </Card.Text>
            <Rating
              style={{ height: "30px" }}
              name="size-medium"
              defaultValue={2}
            />
            {/* <Link to={`/services/reserva/${service.idServico}`}>
              <Button
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
                variant="dark"
                size="sm"
              >
                Reservar
              </Button>
            </Link> */}
          </Card.Body>
        </Card>
      </div>
    ));
  }

  return (
    <div>
      <div style={{ margin: "20px", padding: "20px", borderRadius: "20px" }}>
        <h3>Serviços</h3>
        <MDBCol md="6">
          <div
            className="input-group md-form form-sm form-1 pl-0"
            style={{ width: "514px" }}
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
              placeholder="Pesquisar serviço"
              value={searchTerm}
              onChange={handleChange}
              aria-label="Search"
            />
          </div>
        </MDBCol>
        <div className="productsList">{content}</div>
      </div>
    </div>
  );
}
