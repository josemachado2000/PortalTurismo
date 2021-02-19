const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Home" });
});

require("./app/routes/UserRoute.js")(app);
require("./app/routes/ProdutoRoute.js")(app);
require("./app/routes/ServiceRoute.js")(app);
require("./app/routes/SupplierRoute.js")(app);
require("./app/routes/ClientRoute.js")(app);
require("./app/routes/ShopRoute.js")(app);
require("./app/routes/ShopImageRoute.js")(app);
require("./app/routes/ServiceImageRoute.js")(app);
require("./app/routes/ProductImageRoute.js")(app);
require("./app/routes/OrderRoute.js")(app);
require("./app/routes/OrderLineRoute.js")(app);

// set port, listen for requests
app.listen(5000, () => {
  console.log(
    "Server is running on port 5000.\n---------------------------------------------------------------------------------------------------------------------"
  );
});
