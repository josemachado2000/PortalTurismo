// // TODO IMPORTS -------------------------------------------------------------------------------- //
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Popup from "reactjs-popup";

// import "reactjs-popup/dist/index.css";
// import { Table, Button } from "react-bootstrap";

// // TODO ---------------------------------------------------------------------------------------- //
// export default function Order() {
//   const [orders, setOrders] = useState();

//   const fetchData = async () => {
//     const result = await fetch(
//       `http://localhost:5000/clients/orders/${token.data.user.idUser}`
//     );
//     const order = await result.json();
//     setOrders(order);
//   };

//   console.log(orders);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   //   var content = null;
//   //   if (orders) {
//   //     content = orders.map((order) => (
//   //       <tr key={order.idEncomenda}>
//   //         <td style={{ verticalAlign: "middle" }}>{order.idEncomenda}</td>
//   //         <td style={{ verticalAlign: "middle" }}>{order.dataEncomenda}</td>
//   //         <td style={{ verticalAlign: "middle" }}>{order.dataEntrega}</td>
//   //         <td style={{ verticalAlign: "middle" }}>
//   //           {order.valorTotal.toFixed(2)}€
//   //         </td>
//   //         <td style={{ textAlign: "center" }}>
//   //           <Link to={`/clients/orders/${order.idEncomenda}`}>
//   //             <Button
//   //               variant="dark"
//   //               size="sm"
//   //               style={{ position: "relative", marginBottom: "0px" }}
//   //             >
//   //               Visualizar
//   //             </Button>
//   //           </Link>
//   //         </td>
//   //       </tr>
//   //     ));
//   //   }

//   return (
//     <div
//       style={{
//         backgroundColor: "white",
//         margin: "20px",
//         padding: "20px",
//         borderRadius: "20px",
//       }}
//     >
//       <div
//         style={{ display: "flex", position: "relative", marginBottom: "20px" }}
//       >
//         <h3>Encomendas</h3>
//       </div>
//       <Table responsive="xl">
//         <thead>
//           <tr>
//             <th style={{ width: "60px" }}>#</th>
//             <th style={{ width: "200px" }}>Data da Encomenda</th>
//             <th style={{ width: "200px" }}>Data da Entrega</th>
//             <th style={{ width: "60px" }}>Total</th>
//             <th style={{ width: "150px" }}></th>
//           </tr>
//         </thead>
//         <tbody>{content}</tbody>
//       </Table>
//     </div>
//   );
// }
