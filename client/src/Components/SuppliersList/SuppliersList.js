// TODO IMPORTS -------------------------------------------------------------------------------- //
import axios from "axios";
import React, { useState, useEffect } from "react";

import { Table, Button } from "react-bootstrap";

// TODO SUPPLIER LIST -------------------------------------------------------------------------- //
export default function SuppliersList() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetchData = async () => {
    const result = await fetch("http://localhost:5000/suppliers");
    const supplier = await result.json();
    setSuppliers(supplier);
  };

  useEffect(() => {
    fetchData();
  }, [suppliers.estado]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const updateEstado = (id, estado) => {
    console.log(id);
    console.log(estado);

    axios
      .put(`http://localhost:5000/suppliers/${id}&${estado}`)
      .then(() => fetchData());
  };

  var content = null;
  if (suppliers) {
    const results = suppliers.filter((sup) =>
      sup.nomeApp.toLowerCase().includes(searchTerm)
    );
    content = results.map((supplier) => (
      <tr key={supplier.idFornLoj}>
        <td>{supplier.idFornLoj}</td>
        <td style={{ textAlign: "center" }}>
          <Button
            style={{
              position: "relative",
              marginBottom: "0px",
              font: "14px",
              width: "80px",
              height: "35px",
              textTransform: "none",
            }}
            variant="light"
            onClick={() => updateEstado(supplier.idFornLoj, supplier.estado)}
          >
            {supplier.estado}
          </Button>
        </td>
        <td>{supplier.nomeApp}</td>
        <td>{supplier.nome}</td>
        <td>{supplier.dataNascimento}</td>
        <td>{supplier.morada}</td>
        <td>{supplier.email}</td>
        <td>{supplier.contacto}</td>
      </tr>
    ));
  }

  return (
    <div style={{ padding: "20px" }}>
      <input
        className="form-control my-0 py-1"
        type="text"
        placeholder="Pesquisar fornecedor ou lojista"
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search"
      />
      <Table
        style={{ marginTop: "10px" }}
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Estado</th>
            <th>Username</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Morada</th>
            <th>Email</th>
            <th>Contacto</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </Table>
    </div>
  );
}
