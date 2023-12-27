const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();
app.use(express.json());
var cors = require("cors");
app.use(cors());
const allRoutes = require("./Router/indexRoute");
const connectToDatabase = require("./config/connection");
app.use(allRoutes);
connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
