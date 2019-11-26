const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const {
  handle500s,
  handle404s,
  handleCustoms,
  handle400s
} = require("./errors");
app.use("/api", apiRouter);
app.use("/*", handle404s);
app.use(handle400s);
app.use(handleCustoms);

app.use(handle500s);

module.exports = app;
