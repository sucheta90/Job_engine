const express = require("express");
const path = require("path");
const db = require("./config/dbConnection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
