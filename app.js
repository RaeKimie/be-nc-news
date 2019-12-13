const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const cors = require("cors");
const {
  handle500s,
  handle404s,
  handleCustoms,
  handle400s,
  handle422s
} = require("./errors");
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.use("/*", handle404s);
app.use(handle422s);
app.use(handle400s);
app.use(handleCustoms);

app.use(handle500s);

module.exports = app;
